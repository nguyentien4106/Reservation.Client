import React, { lazy } from "react";
import Donate from "@/pages/donate/Donate"
import { Route } from "react-router-dom";

export default [
    {
        path: "/donate",
        element: (<Donate />),
    },
   
];

export const DonateRotues = (
    <>
        <Route path="/donate" element={<Donate />} />
    </>
)