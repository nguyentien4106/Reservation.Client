import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './shared/AppLayout';
import Home from './pages/home/Home';
import Register from './pages/register/Register'
const App = () => {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/login' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>

                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};
export default App;