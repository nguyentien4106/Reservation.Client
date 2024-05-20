import React, { lazy } from "react";
import useLazy from "./useLazy";
const Account = lazy(() => import("@/pages/account/Account"));

export default [
    {
        path: "/account",
        element: useLazy(<Account />),
    },
    
];
