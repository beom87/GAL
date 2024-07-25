import Icon from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Game() {
    const [time, setTime] = useState({ s: 0, ms: 0 });
    const [playState, setPlayState] = useState<'play' | 'stop'>('stop');
    const reqAnimation = useRef(0);
    let startTime = 0;
    const t = useRef({ start: 0, result: 0 });

    const update = () => {
        const currentTime = Date.now() - t.current.start;

        const ms = currentTime % 1000;
        const s = Math.floor(currentTime / 1000);

        setTime({ s, ms });

        startTime += 1;
        reqAnimation.current = requestAnimationFrame(update);
    };

    const onRunClick = () => {
        if (playState === 'play') {
            if (time.s <= 5) {
                return;
            }
            const last2Digit = time.ms.toString().slice(0, 2).padStart(2, '0');
            const first = parseInt(last2Digit.charAt(0));
            const second = parseInt(last2Digit.charAt(1));
            t.current.result = first + second;

            if (first - second === 0 || first + second === 10) {
                confetti({ particleCount: 150 });
            }
            cancelAnimationFrame(reqAnimation.current);
            setPlayState('stop');

            return;
        }
        if (playState === 'stop') {
            t.current.start = Date.now();
            reqAnimation.current = requestAnimationFrame(update);
            setPlayState('play');
        }
    };

    return (
        <div>
            <div className={cn('py-28 text-center text-3xl font-semibold transition-opacity duration-1000', playState === 'play' && 'opacity-100')}>
                {time.s.toString().padStart(2, '0')}:{time.ms.toString().slice(0, 2).padStart(2, '0')}
            </div>
            <div>
                <button className={cn('w-full [&>svg]:text-main', playState === 'play' && time.s <= 5 && '[&>svg]:text-gray-500')} onClick={onRunClick}>
                    {playState === 'stop' && <Icon className="m-auto" name="CirclePlay" size={40}></Icon>}
                    {playState === 'play' && <Icon className="m-auto" name="CirclePause" size={40}></Icon>}
                </button>
            </div>
            <div></div>
        </div>
    );
}
