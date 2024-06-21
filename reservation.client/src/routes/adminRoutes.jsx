import React from "react";
import { Route } from "react-router-dom";
import Users from "../pages/manage/users/Users";


export const AdminRoutes = (
    <>
        <Route path="/manage/users" element={<Users />} />
    </>
)