import React, { lazy } from "react";
import Home from "@/pages/home/Home"
import CollaboratorPage from "@/pages/home/collaborator/CollaboratorPage"

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
