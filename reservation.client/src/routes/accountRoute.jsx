import React, { lazy } from "react";
import Account from "../pages/account/Account";
import ChangePassword from "../components/account/ChangePassword";
import { Route } from "react-router-dom";
import AccountLayout from "../components/account/AccountLayout";

export default [
    {
        path: '/account-info',
        element: <Account />
    }, 
    {
        path: "/account-change-password",
        element: <ChangePassword />
    },
];

export const AccountRoutes = (
    <>
        <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="change-password" element={<ChangePassword />} />
        </Route>
    </>
)