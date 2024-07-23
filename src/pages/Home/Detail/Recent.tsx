import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import useHistoryStore from '@/stores/history';
import useHomeStore from '@/stores/home';
import { BarChart, Bar, CartesianGrid, Rectangle, XAxis } from 'recharts';

const CustomBar = (props: any) => {
    const color = props.focus === props.winner ? '#d12026' : '#3b5998';
    return <Rectangle {...props} fill={color} />;
};

export default function Recent() {
    const { focus } = useHomeStore();
    const { history } = useHistoryStore();

    const data = history?.slice(-10).map((r) => ({ ...r, price: parseInt(r.price.replace(/₩|,/g, '')) }));
    return (
        <div className="mx-2 mt-8 rounded border-2 py-2 shadow">
            <h1 className="mb-2 py-4 text-center font-bold md:text-2xl">최근 10일 당첨 내역</h1>
            <ChartContainer className="m-auto max-w-2xl px-4" config={{ price: { label: 'price' } }}>
                <BarChart data={data}>
                    <CartesianGrid vertical={false} />
                    {/* <XAxis dataKey="date" /> */}
                    <ChartTooltip
                        cursor={{ fill: 'lightgrey' }}
                        content={<ChartTooltipContent />}
                        labelFormatter={(_, r) => r[0].payload.date + ' / ' + r[0].payload.winner}
                    />
                    <Bar dataKey="price" shape={<CustomBar focus={focus} radius={4} />} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
