import React from "react";
import { Route } from "react-router-dom";
import Users from "../pages/manage/users/Users";
import Services from "../pages/manage/services/Services";


export const AdminRoutes = (
    <>
        <Route path="/manage/users" element={<Users />} />
        <Route path="/manage/services" element={<Services />} />
    </>
)