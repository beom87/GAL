import useHistoryStore from '@/stores/history';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import useUserStore from '@/stores/user';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icons';

export default function List({ filter }: { filter: DateRange & { type: 'single' | 'range' } & { filter: string } }) {

    console.log(filter)
    const { user } = useUserStore();
    const { history } = useHistoryStore();
    const [slice, setSlice] = useState(30);
    const filteredHistory = useMemo(() => {
        if (!history) return [];
        const dateFilter = history
            .slice()
            .reverse()
            .filter((h) => {
                const date = new Date(h.date);
                if (!!filter.from && !!filter.to) return date >= filter.from && date <= filter.to;
                if (!!filter.from && !filter.to) return date.toDateString() === filter.from.toDateString();
                if (!filter.from && !filter.to) return true;

                return false;
            });
        const userFilter = dateFilter.filter((u) => {
            if (filter.filter === 'all') return true;
            return u[filter.filter] === 'TRUE';
        });

        return userFilter;
    }, [filter]);
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

    useEffect(() => {
        const blur = () => {
            setOpenTooltip(-1);
        };
        document.addEventListener('click', blur);
        return () => {
            document.removeEventListener('click', blur);
        };
    }, []);

    return (
        <div className="px-4 py-2">
            <Table className="m-auto max-w-[300px] overflow-auto sm:max-w-none">
                <TableHeader className="sticky top-0">
                    <TableRow className="border-t">
                        <TableHead className="border-r text-center">날짜</TableHead>
                        <TableHead className="pointer-events-none border-r text-center">비용</TableHead>
                        <TableHead className="pointer-events-none border-r text-center">승자</TableHead>
                        <TableHead className="text-center">참여수</TableHead>
                        {user?.map((u) => (
                            <TableHead className="hidden border-l text-center xl:table-cell" key={u.name}>
                                {u.name}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sliceList.map((h, i) => (
                        <TableRow className="font-medium" key={h.date + i + h.price + h.participants}>
                            <TableCell className="border-r text-center">{h.date}</TableCell>
                            <TableCell className="border-r text-center">{h.price}</TableCell>
                            <TableCell className="border-r text-center">{h.winner}</TableCell>
                            <TableCell className="text-center">
                                <div className="relative flex items-center justify-center">
                                    <span>{h.participants}</span>
                                    <Tooltip open={i === openTootip}>
                                        <TooltipTrigger
                                            className="absolute right-0 mt-1 rounded-full border p-2 xl:hidden"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDetailParticipantsClick(i);
                                            }}
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
                            {user?.map((u) => (
                                <TableCell key={u.name} className="hidden border-l xl:table-cell">
                                    {h[u.name] === 'TRUE' && <Icon className="m-auto" name="Check" size={16}></Icon>}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    <TableRow ref={ref}></TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
