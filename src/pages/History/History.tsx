import Icon from '@/components/ui/icons';
import spreadsheets from '@/spreadsheets';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import useUserStore from '@/stores/user';
import List from './List';

type FilterState = DateRange & { type: 'single' | 'range' } & { filter: string };

export default function History() {
    const { user } = useUserStore();
    const [loginState, setLoginState] = useState(false);
    const [filter, setFilter] = useState<FilterState>({ type: 'single', from: new Date(), filter: 'all' });
    const [mark, setMark] = useState<(typeof filter)[]>([]);
    const [markIndex, setMarkIndex] = useState(0);

    const onLockClick = () => {
        if (!loginState) {
            spreadsheets.refresh();
        } else {
            spreadsheets.authorize();
        }
    };

    const onTypeChange = (r: string) => {
        setFilter((prev) => ({ ...prev, type: r as 'single' | 'range', to: undefined }));
    };

    const onSelectDate = (r: DateRange | undefined) => {
        if (!r) return;
        setFilter((prev) => ({ ...prev, ...r }));
    };

    const onFilterChange = (r: string) => {
        setFilter((prev) => ({ ...prev, filter: r }));
    };

    const onSearchClick = () => {
        setMark((prev) => [filter, ...prev].slice(0, 4));
        setMarkIndex(0);
    };
    const onMarkClick = (i: number) => {
        setMarkIndex(i);
    };

    useEffect(() => {
        spreadsheets.on('authorize', () => {
            setLoginState(true);
        });
    }, []);

    return (
        <>
            <div className="h-[500px] bg-[url(https://zeimage.eastarjet.com/newstar/images/bg_main_mid.png)] bg-cover bg-center bg-no-repeat text-white">
                <div className="flex h-full flex-col justify-between">
                    <header className="relative py-5 text-center text-2xl">
                        <span>HEADER</span>
                        <button className="absolute right-5" onClick={onLockClick}>
                            {!loginState ? <Icon name="LockKeyhole" /> : <Icon name="RefreshCw" />}
                        </button>
                    </header>
                    <div className="mx-11">
                        <div className="rounded-lg bg-white p-3 text-gray-500">
                            <div>
                                <Tabs defaultValue="single" className="w-[400px]" onValueChange={onTypeChange}>
                                    <TabsList>
                                        <TabsTrigger value="single">단일</TabsTrigger>
                                        <TabsTrigger value="range">범위</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <div className="flex flex-wrap gap-x-10 gap-y-4 pb-3 pt-4">
                                <div>
                                    <span className="text-sm font-semibold">날짜</span>
                                    <div className="mt-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className={cn(
                                                        'flex h-10 w-60 items-center gap-x-1 rounded border p-2',
                                                        filter.type === 'single' && 'justify-center'
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {filter?.from ? (
                                                        filter.to ? (
                                                            <>
                                                                {format(filter.from, 'yyyy-MM-dd')} - {format(filter.to, 'yyyy-MM-dd')}
                                                            </>
                                                        ) : (
                                                            format(filter.from, 'yyyy-MM-dd') + (filter.type === 'range' ? ' - ' : '')
                                                        )
                                                    ) : (
                                                        <span>전체 기간</span>
                                                    )}
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                {filter.type === 'range' && (
                                                    <Calendar mode="range" initialFocus defaultMonth={filter.from} selected={filter} onSelect={onSelectDate} />
                                                )}
                                                {filter.type === 'single' && (
                                                    <Calendar
                                                        mode="single"
                                                        initialFocus
                                                        defaultMonth={filter.from}
                                                        selected={filter.from}
                                                        onSelect={(r) => onSelectDate({ from: r })}
                                                    />
                                                )}
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold">사람</span>
                                    <div className="mt-2">
                                        <Select onValueChange={onFilterChange}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="모두" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">모두</SelectItem>
                                                {user?.map((u) => (
                                                    <SelectItem key={u.name} value={u.name}>
                                                        {u.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex h-[72px] items-end">
                                    <button className="h-10 w-20 rounded border" onClick={onSearchClick}>
                                        검색
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-20 pb-1 pt-2">
                            {mark.map((_, i) => (
                                <button key={i} className={cn('px-4', i !== 3 && 'border-r-2 border-r-white')} onClick={() => onMarkClick(i)}>
                                    {_?.from ? (
                                        _.to ? (
                                            <>
                                                {format(_.from, 'yyyy-MM-dd')} - {format(_.to, 'yyyy-MM-dd')}
                                            </>
                                        ) : (
                                            format(_.from, 'yyyy-MM-dd') + (_.type === 'range' ? ' - ' : '')
                                        )
                                    ) : (
                                        <span>전체 기간</span>
                                    )}
                                    <div>{_.filter === 'all' ? '모두' : _.filter}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <List filter={mark[markIndex] || { type: 'single', from: new Date(), filter: 'all' }} />
        </>
    );
}
