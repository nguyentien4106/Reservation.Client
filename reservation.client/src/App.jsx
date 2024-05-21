import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/common/Loading';
import { useSelector } from 'react-redux';
import { Spin, message } from 'antd';
import { App as AntdApp } from 'antd'
import routes, { AppRoutes } from './routes';
import AppLayout from './layouts/AppLayout';
import { getLocal } from './lib/helper';
import ErrorPage from './pages/common/ErrorPage';
import SettingPage from './pages/collaborator/SettingPage';
import ManageCollaborator from './pages/manage/ManageCollaborator';
import CollaboratorInfor from './pages/home/collaborator/CollaboratorPage';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import { HomeRoutes } from './routes/homeRoute';

const router = createBrowserRouter(routes)

function App() {
    const isLoading = useSelector(state => state.loading.isLoading)
    const [msg, contextHolder] = message.useMessage()

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<AppLayout />}>
                            {
                                AppRoutes
                            }
                            <Route path='login' element={<Login />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                {/* <RouterProvider router={createBrowserRouter(routes)} fallbackElement={<Spin />} future={{ v7_startTransition: true }}/> */}
            </AntdApp>
        </>
    );

}

export default App;

// <BrowserRouter>
//                     <Routes>
//                         <Route path='/' element={<AppLayout />}>
//                             <Route index={true} element={<Home />} />
//                             <Route
//                                 path=':id'
//                                 element={<CollaboratorInfor />}
//                             />
//                             <Route path='login' element={<Login />} />
//                             <Route path='forgot-password' element={<ForgotPassword />} />
//                             <Route path='reset-password' element={<ResetPassword />} />
//                             <Route path='register' element={<Register />} />
//                             <Route path='confirm-email' element={<ConfirmEmail />} />
//                             <Route path='collaborator' element={<SettingPage />}>
//                                 <Route
//                                     path=':id'
//                                     element={<SettingPage />}
//                                 />
//                             </Route>

//                             {/* <Route path='manage-collaborator' element={<ManageCollaborator />} /> */}
//                             <Route path='/error' element={<ErrorPage />} />
//                             <Route path='*' element={<ErrorPage />} />
//                         </Route>
//                     </Routes>
//                 </BrowserRouter>