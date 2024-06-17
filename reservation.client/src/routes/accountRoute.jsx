import React from "react";
import Account from "../pages/account/Account";
import ChangePassword from "../components/account/ChangePassword";
import { Route } from "react-router-dom";
import AccountLayout from "../components/account/AccountLayout";
import Customer from "@/pages/collaborator/Customer"
import SettingPage from "@/pages/collaborator/SettingPage"
import Overall from "@/pages/collaborator/Overall"
import CustomerOverall from "../pages/customer/CustomerOverall";
import DonateHistory from "../pages/customer/DonateHistory";
import OrderHistory from "@/pages/customer/OrderHistory"
import JobOverall from "../pages/jobs/JobOverall";
import JobApplied from "../pages/jobs/JobApplied";

export const AccountRoutes = (
    <>
        <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Account />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="collaborator-customer" element={<Customer />} />
            <Route path="collaborator-setting" element={<SettingPage />} />
            <Route path="collaborator-overall" element={<Overall />} />

            <Route path="customer-overall" element={<CustomerOverall />} />
            <Route path="customer-orders" element={<OrderHistory />} />
            <Route path="customer-donates" element={<DonateHistory />} />

            <Route path="job-overall" element={<JobOverall />} />
            <Route path="job-applied" element={<JobApplied />} />
            {/* <Route path="customer-orders" element={<OrderHistory />} />
            <Route path="customer-donates" element={<DonateHistory />} /> */}
        </Route>

    </>
)