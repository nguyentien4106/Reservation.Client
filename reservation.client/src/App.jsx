import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/common/Loading';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { App as AntdApp } from 'antd'
import { AppRoutes } from './routes';
import AppLayout from './layouts/AppLayout';
import { UserContext } from './context/useUserContext';
import { getUser } from './lib/helper';
import { useState } from 'react';

function App() {
    const isLoading = useSelector(state => state.loading.isLoading)
    const [msg, contextHolder] = message.useMessage()
    const [user, setUser] = useState(getUser())

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                <UserContext.Provider value={{ user : user, setUser: setUser}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<AppLayout />} >
                                {
                                    AppRoutes
                                }
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </AntdApp>
        </>
    );

}

export default App;
