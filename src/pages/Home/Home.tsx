import { useEffect } from 'react';
import Summary from './Summary';
import useHistoryStore from '@/stores/history';

import { history as fakeHistory, user as fakeUser } from '@/apis/mock';
import { dealy } from '@/lib/utils';
import useUserStore from '@/stores/user';
import Detail from './Detail';
import Header from './Header';
// import spreadsheets from '@/spreadsheets';

export default function Home() {
    const { setHistory } = useHistoryStore();
    const { setUser } = useUserStore();

    useEffect(() => {
        // spreadsheets.refresh();

        // spreadsheets.on('authorize', async () => {
        //     spreadsheets.getUser().then((r: any) => {
        //         setUser(r);
        //         console.log('user');
        //         console.log(r);
        //     });
        //     spreadsheets.getHistory().then((r: any) => {
        //         setHistory(r);
        //         console.log('history');
        //         console.log(r);
        //     });
        // });

        dealy().then(() => {
            setUser(fakeUser);
            setHistory(fakeHistory);
        });
    }, []);

    return (
        <>
            <Header />
            <main>
                <Summary />
                <Detail />
            </main>
        </>
    );
}
