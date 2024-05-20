
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/common/Loading';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { App as AntdApp } from 'antd'
import AppLayout from './layouts/AppLayout';
import { getLocal } from './lib/helper';
import ErrorPage from './pages/common/ErrorPage';
import SettingPage from './pages/collaborator/SettingPage';
import ManageCollaborator from './pages/manage/ManageCollaborator';
import CollaboratorInfor from './pages/home/collaborator/CollaboratorPage';
import ResetPassword from './pages/auth/ResetPassword';
import ForgotPassword from './pages/auth/ForgotPassword';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout></AppLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/confirmemail",
                element: <ConfirmEmail />
            },
            {
                path: "/reset-password",
                element: <ResetPassword />
            },
            {
                path: "/collaborator",
                element: <SettingPage />,
                children: [
                    {
                        path: ":id",
                        element: <SettingPage />
                    }
                ]
            }
        ]
    },
]) 

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
                            <Route index={true} element={<Home />} />
                            <Route
                                path=':id'
                                element={<CollaboratorInfor />}
                            />
                            <Route path='login' element={<Login />} />
                            <Route path='forgot-password' element={<ForgotPassword />} />
                            <Route path='reset-password' element={<ResetPassword />} />
                            <Route path='register' element={<Register />} />
                            <Route path='confirm-email' element={<ConfirmEmail />} />
                            <Route path='collaborator' element={<SettingPage />}>
                                <Route
                                    path=':id'
                                    element={<SettingPage />}
                                />
                            </Route>

                            {/* <Route path='manage-collaborator' element={<ManageCollaborator />} /> */}
                            <Route path='/error' element={<ErrorPage />} />
                            <Route path='*' element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AntdApp>
        </>

    );

}
export default App;