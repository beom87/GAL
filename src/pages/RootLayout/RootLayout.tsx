import { Outlet } from 'react-router-dom';

import SideBar from './SideBar';

export default function RootLayout() {
    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-10 bg-gray-50"></div>
            <div className="flex justify-center">
                <div className="w-full min-w-80 bg-white">
                    <div className="flex">
                        <aside>
                            <SideBar />
                        </aside>
                        <div className="flex-1">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
