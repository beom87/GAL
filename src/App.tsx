import { BrowserRouter, Route, Routes } from 'react-router-dom';

import RootLayout from './pages/RootLayout/RootLayout';
import Home from './pages/Home';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
    return (
        <TooltipProvider>
            <BrowserRouter basename="GAL">
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route path="" element={<Home />}></Route>
                        <Route path="history" element={<div>history</div>}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    );
}

export default App;
