import React, { lazy } from "react";
import Home from "@/pages/home/Home"
import CollaboratorPage from "@/pages/home/collaborator/CollaboratorPage"
import { Route } from "react-router-dom";

export default [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/collaborators/:id",
        element: <CollaboratorPage />
    }
];

export const HomeRoutes = <>
    <Route index element={<Home />}/>
    <Route path="/collaborators/:id" element={<CollaboratorPage />}/>
</>
