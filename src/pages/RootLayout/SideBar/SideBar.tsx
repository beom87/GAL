import Icon from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type NaviList = 'home' | 'history';

export default function SideBar() {
    const [focus, setFocus] = useState<NaviList>('home');

    const onNaviClick = (type: NaviList) => setFocus(type);

    return (
        <nav className="flex h-full min-h-screen flex-col gap-y-4 border-r p-3">
            <button className={cn('rounded border p-2 pt-2.5', focus === 'home' && 'border-main bg-main text-white')} onClick={() => onNaviClick('home')}>
                <Icon name="House"></Icon>
            </button>
            <button className={cn('rounded border p-2 pt-2.5', focus === 'history' && 'border-main bg-main text-white')} onClick={() => onNaviClick('history')}>
                <Icon name="ReceiptText"></Icon>
            </button>
        </nav>
    );
}
