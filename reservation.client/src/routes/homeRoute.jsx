import React, { lazy } from "react";
import useLazy from "./useLazy";

const Home = lazy(() => import("@/pages/home/Home"));
const CollaboratorPage = lazy(() => import("@/pages/home/collaborator/CollaboratorPage"))

export default [
    {
        path: "/",
        element: useLazy(<Home />),
    },
    {
        path: "/:id",
        element: useLazy(<CollaboratorPage />)
    }
];
