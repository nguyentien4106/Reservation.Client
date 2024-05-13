
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/Loading';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { App as AntdApp } from 'antd'
import ConfirmEmail from './pages/ConfirmEmail';
import AppLayout from './components/shared/layout/AppLayout';
import { getLocal } from './lib/helper';
import ErrorPage from './pages/ErrorPage';
import UserServicesRegister from './pages/CollaboratorSetting';
import CollaboratorSetting from './pages/CollaboratorSetting';

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <AppLayout></AppLayout>,
//         children: [
//             {
//                 path: '/login',
//                 element: <Login></Login>
//             }
//         ]
//     },
//     // {
//     //     path: "/login",
//     //     element: <Login></Login>
//     // },
//     {
//         path: "/register",
//         element: <Register></Register>
//     },
//     {
//         path: "/ConfirmEmail",
//         element: <ConfirmEmail></ConfirmEmail>
//     }
// ])

function App() {
    const isLoading = useSelector(state => state.loading.isLoading)
    const [msg, contextHolder] = message.useMessage()
    const isAuth = getLocal("email") ? true : false

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<AppLayout isAuth={isAuth}/>}>
                                <Route index={true} element={<Home />} />
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                                <Route path='confirmemail' element={<ConfirmEmail />} />
                                <Route path='collaborator-setting' element={<CollaboratorSetting />}/>
                                <Route path='*' element={<ErrorPage />} />
                            </Route>
                        </Routes>
                </BrowserRouter>
            </AntdApp>
        </>

    );

}
export default App;