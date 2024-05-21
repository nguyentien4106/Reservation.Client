import AppLayout from '@/layouts/AppLayout';
import ErrorPage from '@/pages/common/ErrorPage'
import authRoute, { AuthRoutes } from './authRoute';
import collaboratorRoute, { CollaboratorRoutes } from './collaboratorRoute';
import donateRoute, { DonateRotues } from './donateRoute';
import homeRoute, { HomeRoutes } from './homeRoute';
import accountRoute, { AccountRoutes } from './accountRoute';

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

export const AppRoutes = (
    <>
        { HomeRoutes }
        { AuthRoutes }
        { CollaboratorRoutes }
        { DonateRotues }
        { AccountRoutes }
    </>
)
export default routes;