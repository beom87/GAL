import { Card } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useEffect, useMemo, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import useHistoryStore from '@/stores/history';
import useUserStore from '@/stores/user';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icons';
import useHomeStore from '@/stores/home';
import startSrc from '@/assets/images/star.png';

export default function Summary() {
    const { user } = useUserStore();
    const { history } = useHistoryStore();
    const { focus, setFocus } = useHomeStore();
    const [api, setApi] = useState<CarouselApi>();
    const [playState, setPlayState] = useState<'play' | 'stop'>('play');

    const data = useMemo(() => {
        if (!user || !history) return;

        const mapping = ({ name }: { name: string }) => {
            const result = history.reduce(
                (p, c) => {
                    if (c[name] !== 'TRUE') return p;
                    const participants = parseInt(c.participants) || 1;
                    const cost = parseInt(c.price.replace(/₩|,/g, ''));

                    p.total += 1;

                    if (c['winner'] === name) {
                        p.win += 1;
                        p.cost += cost;
                    }

                    p.consume += cost / participants;
                    p.sumOfRate += 1 / participants;
                    p.expRate = (p.sumOfRate / p.total) * 100;
                    p.realRate = (p.win / p.total) * 100;

                    return p;
                },
                { total: 0, win: 0, cost: 0, sumOfRate: 0, consume: 0 }
            );

            return { name, ...result };
        };
        const comparing = (a: any, b: any) => b.cost - a.cost;

        return user.map(mapping).sort(comparing) as {
            consume: number;
            cost: number;
            expRate: number;
            name: string;
            realRate: number;
            total: number;
            win: number;
        }[];
    }, [user, history]);

    const onCardClick = (name: string) => setFocus(name);

    // const onCarouselPlayClick = () => {
    //     if (playState === 'play') {
    //         setPlayState('stop');
    //         return;
    //     }
    //     if (playState === 'stop') setPlayState('play');
    // };

    useEffect(() => {
        if (playState === 'play') {
            api?.plugins().autoplay.play();
            return;
        }
        if (playState === 'stop') api?.plugins().autoplay.stop();
    }, [playState]);

    useEffect(() => {
        const autoPlayStopListner = () => setPlayState('stop');
        api?.on('autoplay:stop', autoPlayStopListner);

        return () => {
            api?.off('autoplay:stop', autoPlayStopListner);
        };
    }, [api]);

    return (
        <div className="relative">
            <div className="h-96">
                <Carousel
                    className="m-auto w-full max-w-[300px] lg:max-w-screen-lg 2xl:max-w-screen-2xl"
                    setApi={setApi}
                    opts={{ loop: true, align: 'start' }}
                    plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
                >
                    <CarouselContent className="-ml-2">
                        {data?.map((history, index) => (
                            <CarouselItem key={index} className="pl-2 lg:basis-1/3 2xl:basis-1/5">
                                <div className="p-1">
                                    <Card
                                        className={cn('flex h-96 flex-col justify-between overflow-auto bg-main text-gray-900', {
                                            'bg-[#f5c040] text-[#654321]': index === 0,
                                            'bg-[#c0c0c0] text-[#00008b]': index === 1,
                                            'bg-[#cd7f32] text-white': index === 2,
                                            'animate-bounce-2 shadow-md shadow-neutral-900': focus === history.name
                                        })}
                                        onClick={() => onCardClick(history.name)}
                                    >
                                        <div className="px-3 py-1 text-right text-3xl font-semibold">{index + 1}</div>
                                        <div className="text-center font-semibold text-white">
                                            <div>{history.name}</div>
                                            <div className="flex flex-wrap justify-end gap-2 p-2">
                                                {[...new Array(Math.floor(history.cost / 100000))].map((_) => (
                                                    <img key={_} src={startSrc} width={20}></img>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="px-2 text-white">
                                                <div className="flex items-center justify-between gap-x-2">
                                                    <div className="flex flex-1 gap-x-1">
                                                        <Icon name="Swords" />
                                                        <span className="pb-1">{history.total}</span>
                                                    </div>
                                                    <div className="flex flex-1 gap-x-1">
                                                        <Icon name="Crown" />
                                                        <span className="pb-1">{history.win}</span>
                                                    </div>
                                                    <div className="flex flex-1 justify-end gap-x-1">
                                                        <Icon name="BadgeCent" />
                                                        <span className="pb-1">{history.cost.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-2 pb-1 text-white">
                                                <div className="flex items-center justify-between gap-x-2">
                                                    <div className="flex flex-1 gap-x-1">
                                                        <Icon name="Star" />
                                                        <span className="pb-1">{history.realRate.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex flex-1 gap-x-1">
                                                        <Icon name="StarOff" />
                                                        <span className="pb-1">{history.expRate.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="flex flex-1 gap-x-1">
                                                        <Icon name="HandCoins" />
                                                        <span className="pb-1">{parseInt(history.consume.toFixed(0)).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
            {/* <div className="mt-4 text-center">
                <button className="rounded-full border p-5" onClick={onCarouselPlayClick}>
                    {playState === 'stop' && <Icon name="Play" />}
                    {playState === 'play' && <Icon name="Pause" />}
                </button>
            </div> */}
        </div>
    );
}
