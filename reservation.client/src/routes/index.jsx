import ErrorPage from '@/pages/common/ErrorPage'
import { AuthRoutes } from './authRoute';
import { CollaboratorRoutes } from './collaboratorRoute';
import { DonateRotues } from './donateRoute';
import { HomeRoutes } from './homeRoute';
import { AccountRoutes } from './accountRoute';
import { Route } from 'react-router-dom';
import { CustomerRoutes } from './customerRoute';
import { ActionRoutes } from './actionRoute';
import { JobsRoute } from './jobsRoute';
export const AppRoutes = (
    <>
        <Route path="/error" element={<ErrorPage />}/>
        { HomeRoutes }
        { AuthRoutes }
        { CollaboratorRoutes }
        { DonateRotues }
        { AccountRoutes }
        { CustomerRoutes }
        { ActionRoutes }
        { JobsRoute }
    </>
)