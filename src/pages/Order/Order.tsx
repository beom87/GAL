import Icon from '@/components/ui/icons';
import useUserStore from '@/stores/user';
import { useEffect, useState } from 'react';

export default function Order() {
    const { user } = useUserStore();
    const [player, setPlayer] = useState(user?.map((u) => ({ ...u, join: false })));

    const onPlayerClick = (user: any, isJoin: boolean) => {
        setPlayer((prev) => {
            const p = prev?.map((p) => {
                if (p.name === user.name) p.join = isJoin;
                return { ...p };
            });
            window.localStorage.setItem('GAL-USER', JSON.stringify(p));
            return p;
        });
    };

    useEffect(() => {
        const galUser = window.localStorage.getItem('GAL-USER');
        if (!!galUser) {
            setPlayer(JSON.parse(galUser));
        } else {
            setPlayer(user?.map((u) => ({ ...u, join: false })));
        }
    }, []);

    return (
        <>
            <div className="m-auto flex w-fit">
                <div className="flex-1 border-r p-4">
                    <h1 className="mb-2 flex items-center justify-center gap-x-2 py-2 text-center text-lg font-bold">
                        <span>미참여</span>
                        <Icon name="Frown"></Icon>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {player
                            ?.filter((p) => !p.join)
                            .map((c) => (
                                <div key={c.name}>
                                    <button className="rounded border px-2 py-1 text-lg text-gray-600" onClick={() => onPlayerClick(c, true)}>
                                        {c.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="self-center px-4">
                    <Icon name="ArrowRightLeft"></Icon>
                </div>
                <div className="flex-1 border-l p-4">
                    <h1 className="mb-2 flex items-center justify-center gap-x-2 py-2 text-center text-lg font-bold">
                        <span>참여</span>
                        <Icon name="Smile"></Icon>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {player
                            ?.filter((p) => p.join)
                            .map((c) => (
                                <div key={c.name}>
                                    <button
                                        className="animate-text-gradient rounded border bg-gradient-to-r from-pink-500 to-violet-500 bg-[length:300%] bg-clip-text px-2 py-1 text-lg font-bold text-transparent"
                                        onClick={() => onPlayerClick(c, false)}
                                    >
                                        {c.name}
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="border-t"></div>
            <div className="px-x m-auto max-w-72 border text-center">
                <div className="flex items-center">
                    <div className="flex-1">이름</div>
                    <div className="flex-1">
                        <div className="text-center">메뉴</div>
                        <div className="flex">
                            <div className="flex-1">컴포즈</div>
                            <div className="flex-1">백다방</div>
                            <div className="flex-1">매머드</div>
                        </div>
                    </div>
                </div>
                {player
                    ?.filter((p) => p.join)
                    .map((p) => (
                        <div key={p.name} className="flex">
                            <div className="flex-1">{p.name}</div>
                            <div className="flex-1">
                                <div className="flex">
                                    <div className="flex-1">아아</div>
                                    <div className="flex-1">아우롱</div>
                                    <div className="flex-1">아샷추</div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
