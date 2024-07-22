import { useNavigate } from 'react-router-dom';
import Loading from '../../design-system/ui/Loading';
import clsx from 'clsx';
// import eastarjetLogoSrc from '../../assets/images/eastarjet-logo-white.png';

import { useEffect, useRef, useState } from 'react';
import spreadsheets from '../../spreadsheets';

export default function SignIn() {
    const [loaded, setLoaded] = useState(false);
    const loginInfo = useRef({ id: '', password: '' });
    const navigate = useNavigate();

    const onIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loginInfo.current.id = e.target.value;
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loginInfo.current.password = e.target.value;
    };

    const onLogInClick = async () => {
        const isAuth = spreadsheets.authorize();

        if (isAuth) {
            checkLogIn();
        }
    };

    const checkLogIn = async () => {
        const user = await spreadsheets.getUser();

        const target = user?.find((u) => u.id === loginInfo.current.id);
        if (!target) {
            window.alert('아이디 없음');
            return;
        }

        if (target.password === loginInfo.current.password) {
            navigate('/');
        } else {
            window.alert('패스워드 틀림');
        }
    };

    useEffect(() => {
        spreadsheets.gisLoad();
        spreadsheets.gapiLoad();
        spreadsheets.on('loaded', () => {
            setLoaded(true);
        });
        spreadsheets.on('authorize', async () => {
            checkLogIn();
        });
    }, []);

    return (
        <div className="flex h-screen flex-col font-omp shadow">
            <div className="flex-1 bg-main text-center text-white">
                <div className="flex h-full flex-col justify-center">
                    {/* <img className="px-6 pb-10" src={eastarjetLogoSrc}></img> */}
                    {/* <h2 className="w-full text-9xl">GAL</h2> */}
                </div>
            </div>
            <div className="bg-white px-10 py-20">
                <form>
                    <div className="mb-8 flex items-center">
                        <label className="min-w-28">ID</label>
                        <input className="w-full rounded bg-gray-100 px-4 py-2" type="text" onChange={onIDChange}></input>
                    </div>
                    <div className="mb-10 flex items-center">
                        <label className="min-w-28">PASSWORD</label>
                        <input className="w-full rounded bg-gray-100 px-4 py-2 font-noto" type="password" onChange={onPasswordChange}></input>
                    </div>
                </form>
                <div
                    className={clsx('mb-5 mt-20 rounded-md bg-main text-white transition-all hover:bg-white hover:text-main', !loaded && 'pointer-events-none')}
                >
                    <button className="h-14 w-full rounded border border-main px-12 text-xl" onClick={onLogInClick}>
                        {!loaded && <Loading />}
                        {loaded && '접근 권한 부여&로그인'}
                    </button>
                </div>
            </div>
        </div>
    );
}
