import React, { lazy } from "react";
import useLazy from "./useLazy";

const SettingPage = lazy(() => import("@/pages/collaborator/SettingPage"));
const Overall = lazy(() => import("@/pages/collaborator/Overall"));
const Customer = lazy(() => import("@/pages/collaborator/Customer"));

export default [
    {
        path: "/collaborator-overall",
        element: useLazy(<Overall />),
    },
    {
        path: "/collaborator-customer",
        element: useLazy(<Customer />),
    },
    {
        path: "/collaborator-setting",
        element: useLazy(<SettingPage />),
        children: [
            {
                path: ":id",
                element: useLazy(<SettingPage />),

            }
        ]
    },
];
