import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Main from './pages/Main';

function App() {
    return (
        <>
            <div className="fixed inset-0 bg-gray-50 -z-10"></div>
            <div className="flex justify-center">
                <div className="w-full min-w-80 max-w-xl">
                    <BrowserRouter basename="GAL">
                        <Routes>
                            <Route path="/sign-in" element={<SignIn />}></Route>
                            <Route path="/main" element={<Main />}></Route>
                            <Route path="/*" element={<Navigate to="/sign-in" replace={true} />}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

export default App;
