import useHomeStore from '@/stores/home';
import WinHistoryTable from './WinHistoryTable';
import Recent from './Recent';

export default function Detail() {
    const { focus } = useHomeStore();

    if (!focus) return <h1 className="py-28 text-center text-2xl font-extrabold">카드를 선택해 주세요.</h1>;

    return (
        <>
            <Recent />
            <WinHistoryTable />
        </>
    );
}
