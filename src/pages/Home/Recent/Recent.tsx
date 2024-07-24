import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import useHistoryStore from '@/stores/history';
import useHomeStore from '@/stores/home';
import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Rectangle } from 'recharts';

const CustomBar = (props: any) => {
    const color = props.focus === props.winner ? '#d12026' : '#3b5998';
    return <Rectangle {...props} fill={color} />;
};

export default function Recent() {
    const { focus } = useHomeStore();
    const { history } = useHistoryStore();
    const [day, setDay] = useState(10);

    const data = history?.slice(-day).map((r) => ({ ...r, price: parseInt(r.price.replace(/₩|,/g, '')) }));

    useEffect(() => {
        const resize = () => {
            setDay(Math.max(10, Math.floor(window.innerWidth / 50)));
        };

        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);
    return (
        <div className="mx-2 mb-8 rounded border-2 py-2 shadow">
            <h1 className="mb-2 py-4 text-center font-bold md:text-2xl">최근 {day}일 내역</h1>
            <ChartContainer className="aspect-auto h-[250px] w-full px-4" config={{ price: { label: 'price' } }}>
                <BarChart data={data}>
                    <CartesianGrid vertical={false} />
                    <ChartTooltip
                        cursor={{ fill: 'lightgrey' }}
                        content={<ChartTooltipContent />}
                        labelFormatter={(_, r) => r[0].payload.date + ' / ' + r[0].payload.winner}
                    />
                    <Bar dataKey="price" label={{ fill: 'gold' }} shape={<CustomBar focus={focus} radius={4} />} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
