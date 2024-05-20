import React, { lazy } from "react";
import useLazy from "./useLazy";

const Donate = lazy(() => import("@/pages/donate/Donate"));

export default [
    {
        path: "/donate",
        element: useLazy(<Donate />),
    },
   
];
