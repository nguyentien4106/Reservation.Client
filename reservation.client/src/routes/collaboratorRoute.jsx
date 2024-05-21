import React, { lazy } from "react";
import SettingPage from "@/pages/collaborator/SettingPage"
import Overall from "@/pages/collaborator/Overall"
import Customer from "@/pages/collaborator/Customer"
import { Route } from "react-router-dom";

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
        <Route path='/collaborator-overall' element={<Overall />} />
        <Route path='/collaborator-customer' element={<Customer />} />
        <Route path='/collaborator-setting' element={<SettingPage />} />
        {/* <Route path='/collaborator-setting/:id' element={<SettingPage />} /> */}
    </>
)
