import React, { lazy } from "react";
import SettingPage from "@/pages/collaborator/SettingPage"
import Overall from "@/pages/collaborator/Overall"
import Customer from "@/pages/collaborator/Customer"
// const SettingPage = lazy(() => import("@/pages/collaborator/SettingPage"));
// const Overall = lazy(() => import("@/pages/collaborator/Overall"));
// const Customer = lazy(() => import("@/pages/collaborator/Customer"));

export default [
    {
        path: "/collaborator-overall",
        element: (<Overall />),
    },
    {
        path: "/collaborator-customer",
        element: (<Customer />),
    },
    {
        path: "/collaborator-setting",
        element: (<SettingPage />),
        children: [
            {
                path: ":id",
                element: (<SettingPage />),

            }
        ]
    },
];
