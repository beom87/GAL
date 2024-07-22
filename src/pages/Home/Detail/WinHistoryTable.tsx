import Icon from '@/components/ui/icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import useHistoryStore from '@/stores/history';
import useHomeStore from '@/stores/home';
import useUserStore from '@/stores/user';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function WinHistoryTable() {
    const { user } = useUserStore();
    const { history } = useHistoryStore();
    const { focus } = useHomeStore();
    const [slice, setSlice] = useState(30);
    const filteredHistory = useMemo(() => history?.filter((h) => h[focus] === 'TRUE' && h.winner === focus) || [], [history, focus]);
    const sliceList = useMemo(() => filteredHistory.slice(0, slice), [filteredHistory, slice]);
    const ref = useRef<HTMLTableRowElement>(null);
    const [openTootip, setOpenTooltip] = useState(-1);

    const onDetailParticipantsClick = (index: number) => {
        if (openTootip === index) setOpenTooltip(-1);
        else setOpenTooltip(index);
    };

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver((entries) =>
            entries.forEach((entry) => {
                if (entry.isIntersecting && slice < filteredHistory.length) {
                    setSlice((prev) => prev + 30);
                }
            })
        );
        observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [focus, slice, filteredHistory]);

    return (
        <div className="mx-2 mt-8 rounded border-2 py-2 shadow">
            <h1 className="py-4 text-center font-extrabold md:text-2xl">당첨 내역</h1>
            <Table className="m-auto max-w-[300px] overflow-hidden sm:max-w-screen-xl">
                <TableHeader className="sticky top-0">
                    <TableRow className="border-t">
                        <TableHead className="border-r px-2 text-center">DATE</TableHead>
                        <TableHead className="pointer-events-none border-r px-2 text-center">PARTICIPANTS</TableHead>
                        <TableHead className="px-2 text-center">PRICE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sliceList.map((h, i) => (
                        <TableRow className="font-medium" key={h.date + i}>
                            <TableCell className="border-r px-1 text-center">{h.date}</TableCell>
                            <TableCell className="border-r px-1 text-center">
                                <div className="relative flex items-center justify-center">
                                    <span>{h.participants}</span>
                                    <Tooltip open={i === openTootip}>
                                        <TooltipTrigger
                                            className="absolute right-0 mt-1 rounded-full border p-2 xl:hidden"
                                            onClick={() => onDetailParticipantsClick(i)}
                                        >
                                            <Icon name="UserSearch" size={16} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            {user
                                                ?.filter((u) => h[u.name] === 'TRUE')
                                                .map((f) => (
                                                    <div className="px-1 py-0.5" key={f.name}>
                                                        {f.name}
                                                    </div>
                                                ))}
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell className="px-1 text-center">{h.price}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow ref={ref}></TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
