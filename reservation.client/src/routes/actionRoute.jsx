import React from "react";
import Action from "../pages/action/Action";
import { Route } from "react-router-dom";


export const ActionRoutes = (
    <>
        <Route path="/post" element={<Action />} />
    </>
)