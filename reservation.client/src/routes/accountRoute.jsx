import React from "react";
import Account from "../pages/account/Account";
import ChangePassword from "../components/account/ChangePassword";
import { Route } from "react-router-dom";
import AccountLayout from "../components/account/AccountLayout";
import Customer from "@/pages/collaborator/Customer"
export const AccountRoutes = (
    <>
        <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="collborator/customer" element={<Customer />} />
        </Route>

    </>
)