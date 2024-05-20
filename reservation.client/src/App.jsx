
import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/common/Loading';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { App as AntdApp } from 'antd'
import router from './routes';

function App() {
    const isLoading = useSelector(state => state.loading.isLoading)
    const [msg, contextHolder] = message.useMessage()

    return (
        <>
            {contextHolder}
            {isLoading && <Loading />}
            <AntdApp>
                <RouterProvider router={createBrowserRouter(router)} />
            </AntdApp>
        </>
    );

}

export default App;