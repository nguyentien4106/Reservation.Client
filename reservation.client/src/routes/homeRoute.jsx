import React, { lazy } from "react";
import CollaboratorPage from "@/pages/home/collaborator/CollaboratorPage"
import { Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Collaborators from "../pages/home/Collaborators";

export default [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/collaborators/:id",
        element: <CollaboratorPage />
    }
];

export const HomeRoutes = <>
    <Route index element={<HomePage />}/>
    <Route path="/collaborators" element={<Collaborators />}/>
    <Route path="/collaborators/:id" element={<CollaboratorPage />}/>
</>
