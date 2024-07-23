import Icon from '@/components/ui/icons';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useState } from 'react';

export default function Header() {
    const [openTrigger, setOpenTrigger] = useState(false);

    return (
        <header className="mb-2 border-b py-4 text-center text-lg font-bold">
            <h1>HEADER</h1>
            <div className="absolute right-3 top-5 z-10 text-sm font-normal" onPointerDown={() => setOpenTrigger((prev) => !prev)}>
                <Tooltip open={openTrigger}>
                    <TooltipTrigger>
                        <Icon name="Info"></Icon>
                    </TooltipTrigger>
                    <TooltipContent className="mr-1 mt-1 rounded-md border bg-white p-2 shadow">
                        <div className="mb-1 flex gap-x-2">
                            <Icon name="Swords" size={20} />
                            <span>참여 횟수</span>
                        </div>
                        <div className="mb-1 flex gap-x-2">
                            <Icon name="Crown" size={20} />
                            <span>당첨 횟수</span>
                        </div>
                        <div className="mb-1 flex gap-x-2">
                            <Icon name="BadgeCent" size={20} />
                            <span>사용 금액</span>
                        </div>
                        <div className="mb-1 flex gap-x-2">
                            <Icon name="Star" size={20} />
                            <span>당첨 확률</span>
                        </div>
                        <div className="mb-1 flex gap-x-2">
                            <Icon name="StarOff" size={20} />
                            <span>기대 확률</span>
                        </div>
                        <div className="flex gap-x-2">
                            <Icon name="HandCoins" size={20} />
                            <span>먹은 금액</span>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
}
