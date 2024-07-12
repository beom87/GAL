export declare global {
    interface Window {
        gapi: {
            load(type: string, fn: () => void): void;
            client: {
                init({ apiKey, discoveryDocs }: { apiKey: string; discoveryDocs: string[] }): Promise;
                getToken(): string;
                sheets: {
                    spreadsheets: {
                        values: {
                            get({ spreadsheetId, range }: { spreadsheetId: string; range: string }): Promise;
                        };
                    };
                };
            };
        };
        google: {
            accounts: {
                oauth2: {
                    initTokenClient({ client_id, scope, callback }: { client_id: string; scope: string; callback?: ((response) => void) | string }): any;
                };
            };
        };
    }
}
