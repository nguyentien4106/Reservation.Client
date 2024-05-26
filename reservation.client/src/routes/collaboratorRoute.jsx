import React, { lazy } from "react";
import SettingPage from "@/pages/collaborator/SettingPage"
import Overall from "@/pages/collaborator/Overall"
import Customer from "@/pages/collaborator/Customer"
import { Route } from "react-router-dom";
import { COLLABORATOR_ROUTE_PATH } from "../constant/paths";

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

export const CollaboratorRoutes = (
    <>
        <Route path={COLLABORATOR_ROUTE_PATH.overall} element={<Overall />} />
        <Route path={COLLABORATOR_ROUTE_PATH.customer} element={<Customer />} />
        <Route path={COLLABORATOR_ROUTE_PATH.setting} element={<SettingPage />} />
        {/* <Route path='/collaborator-setting/:id' element={<SettingPage />} /> */}
    </>
)
