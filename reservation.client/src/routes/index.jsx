import AppLayout from '@/layouts/AppLayout';
import ErrorPage from '@/pages/common/ErrorPage'
import authRoute, { AuthRoutes } from './authRoute';
import collaboratorRoute, { CollaboratorRoutes } from './collaboratorRoute';
import donateRoute, { DonateRotues } from './donateRoute';
import homeRoute, { HomeRoutes } from './homeRoute';
import accountRoute, { AccountRoutes } from './accountRoute';
import { Route } from 'react-router-dom';
import { CustomerRoutes } from './customerRoute';

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
        <Route path="/error" element={<ErrorPage />}/>
        { HomeRoutes }
        { AuthRoutes }
        { CollaboratorRoutes }
        { DonateRotues }
        { AccountRoutes }
        { CustomerRoutes }
    </>
)
export default routes;