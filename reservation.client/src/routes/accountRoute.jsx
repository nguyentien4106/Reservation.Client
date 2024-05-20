import React, { lazy } from "react";
import Account from "../pages/account/Account";
import ChangePassword from "../components/account/ChangePassword";

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
