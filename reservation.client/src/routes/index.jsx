import AppLayout from '@/layouts/AppLayout';
import ErrorPage from '@/pages/common/ErrorPage'
import authRoute from './authRoute';
import collaboratorRoute from './collaboratorRoute';
import donateRoute from './donateRoute';
import homeRoute from './homeRoute';
import accountRoute from './accountRoute';

const routes = [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [...homeRoute, ...authRoute, ...collaboratorRoute, ...donateRoute, ...accountRoute],
    },
    {
        path: '/error',
        element: <ErrorPage />
    }
];

export default routes;