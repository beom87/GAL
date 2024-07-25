import Icon from '@/components/ui/icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NaviList = 'home' | 'history' | 'game' | 'order';

const url = { home: '/', history: 'history', game: 'game', order: 'order' };

export default function SideBar() {
    const [focus, setFocus] = useState<NaviList>('home');
    const navaite = useNavigate();

    const onNaviClick = (type: NaviList) => {
        setFocus(type);
        navaite(url[focus]);
    };

    useEffect(() => {
        navaite(url[focus]);
    }, [focus]);

    return (
        <nav className="sticky top-0 flex h-screen flex-col justify-between border-r p-3">
            <div className="flex flex-col gap-y-4">
                <button className={cn('rounded border p-2 pt-2.5', focus === 'home' && 'border-main bg-main text-white')} onClick={() => onNaviClick('home')}>
                    <Icon name="House"></Icon>
                </button>
                <button
                    className={cn('rounded border p-2 pt-2.5', focus === 'history' && 'border-main bg-main text-white')}
                    onClick={() => onNaviClick('history')}
                >
                    <Icon name="ReceiptText"></Icon>
                </button>
                <button className={cn('rounded border p-2 pt-2.5', focus === 'order' && 'border-main bg-main text-white')} onClick={() => onNaviClick('order')}>
                    <Icon name="ListOrdered"></Icon>
                </button>
                <button className={cn('rounded border p-2 pt-2.5', focus === 'game' && 'border-main bg-main text-white')} onClick={() => onNaviClick('game')}>
                    <Icon name="Joystick"></Icon>
                </button>
            </div>
            <div className="text-center">
                <Tooltip>
                    <TooltipTrigger className="rounded-full border p-2">
                        <Icon name="User"></Icon>
                    </TooltipTrigger>
                    <TooltipContent>마이 페이지</TooltipContent>
                </Tooltip>
            </div>
        </nav>
    );
}
