import EventEmitter from 'eventemitter3';

type EventName = 'loaded' | 'authorize';

export class SpreadSheet extends EventEmitter<EventName> {
    // TODO(developer): Set to client ID and API key from the Developer Console
    protected CLIENT_ID = '1056638879421-l2mpjoho5pnm1dh8m7e0qk0fjl8kh2pn.apps.googleusercontent.com';
    protected API_KEY = 'AIzaSyAGSnRXqm3RH2DXewJdBrMB4S1FZ2HKmsY';

    // Discovery doc URL for APIs used by the quickstart
    protected DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    protected SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

    protected SPREADSHEET_ID = '13-EZjNw_yC_zA0SPhhlRu4K02Bl_pVwow1pEfB-LUV4';

    tokenClient: any;

    protected loadState = {
        gapi: false,
        gis: false
    };

    constructor() {
        super();
    }

    /** Callback after Google Identity Services are loaded. */
    gisLoad() {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: this.CLIENT_ID,
            scope: this.SCOPES,
            callback: () => {
                this.emit('authorize');
            }
        });

        this.onLoadedCheck('gis');
    }
    /** Callback after api.js is loaded. Loads the discovery doc to initialize the API. */
    gapiLoad() {
        window.gapi.load('client', async () => {
            await window.gapi.client.init({
                apiKey: this.API_KEY,
                discoveryDocs: [this.DISCOVERY_DOC]
            });
            this.onLoadedCheck('gapi');
        });
    }

    authorize() {
        if (window.gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            this.tokenClient.requestAccessToken({ prompt: 'consent' });
            console.log('consent');
            return false;
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            this.tokenClient.requestAccessToken({ prompt: '' });
            console.log('session');
            return true;
        }
    }
    refresh() {
        if (window.gapi.client?.getToken()) return;
        return new Promise<void>((r) => {
            this.gisLoad();
            this.gapiLoad();
            this.once('loaded', () => {
                this.authorize();
                r();
            });
        });
    }

    async getUser() {
        if (!window.gapi.client) return;
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: this.SPREADSHEET_ID,
            range: 'USER!A:D'
        });

        return this.sheetParser<{ name: string; phone: string; id: string; password: string }>(response.result.values);
    }
    async getHistory() {
        if (!window.gapi.client) return;
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: this.SPREADSHEET_ID,
            range: 'HISTORY!A:AD'
        });

        return this.sheetParser(response.result.values);
    }

    private onLoadedCheck(type: keyof typeof this.loadState) {
        this.loadState[type] = true;
        if (this.loadState.gapi && this.loadState.gis) this.emit('loaded');
    }
    private sheetParser<T = any>(values: any[]): T[] {
        const fileds = values.shift();

        return values.reduce((p: any[], c: string) => {
            const d = fileds.reduce((p1: any, c1: any, i: number) => {
                if (!c1) return p1;
                p1[c1] = c[i];
                return p1;
            }, {});
            p.push(d);
            return p;
        }, []);
    }
}
