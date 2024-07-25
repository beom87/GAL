import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RootLayout from './pages/RootLayout/RootLayout';
import Home from './pages/Home';
import { TooltipProvider } from './components/ui/tooltip';
import History from './pages/History';
import Game from './pages/Game';
import Order from './pages/Order';

function App() {
    return (
        <TooltipProvider>
            <BrowserRouter basename="GAL">
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path="" element={<Home />}></Route>
                        <Route path="history" element={<History />}></Route>
                        <Route path="order" element={<Order />}></Route>
                        <Route path="game" element={<Game />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    );
}

export default App;
