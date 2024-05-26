import React from "react";
import { Route } from "react-router-dom";
import Overall from "../pages/customer/Overall";
import DonateHistory from "../pages/customer/DonateHistory";
import { CUSTOMER_ROUTE_PATH } from "../constant/paths";
import OrderHistory from "@/pages/customer/OrderHistory"

export const CustomerRoutes = (
    <>
        <Route path={CUSTOMER_ROUTE_PATH.overall} element={<Overall />} />
        <Route path={CUSTOMER_ROUTE_PATH.orderHistory}  element={<OrderHistory />} />
        <Route path={CUSTOMER_ROUTE_PATH.donateHistory} element={<DonateHistory />} />
    </>
)