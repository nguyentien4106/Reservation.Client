
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

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<AppLayout />}>
                                <Route index={true} element={<Home></Home>} />
                                <Route path='login' element={<Login></Login>} />
                                <Route path='register' element={<Register></Register>} />
                            </Route>
                        </Routes>
                </BrowserRouter>
            </AntdApp>
        </>

    );

}
export default App;