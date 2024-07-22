import { useEffect } from 'react';
import Summary from './Summary';
import useHistoryStore from '@/stores/history';

import { history as fakeHistory, user as fakeUser } from '@/apis/mock';
import { dealy } from '@/lib/utils';
import useUserStore from '@/stores/user';
import Detail from './Detail';

export default function Home() {
    const { setHistory } = useHistoryStore();
    const { setUser } = useUserStore();

    useEffect(() => {
        // spreadsheets.refresh();
        // spreadsheets.on('authorize', async () => {
        //     spreadsheets.getUser().then((r) => {
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
            <header className="flex justify-between">
                <div>HEADER</div>
                <div>공지</div>
            </header>
            <main>
                <Summary />
                <Detail />
            </main>
        </>
    );
}
