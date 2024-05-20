import React, { lazy } from "react";
import useLazy from "./useLazy";

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ConfirmEmail = lazy(() => import("@/pages/auth/ConfirmEmail"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

export default [
    {
        path: "/login",
        element: useLazy(<Login />),
    },
    {
        path: "/register",
        element: useLazy(<Register/>),
    },
    {
        path: "/confirmemail",
        element: useLazy(<ConfirmEmail />),
    },
    {
        path: "/reset-password",
        element: useLazy(<ResetPassword />),
    },
    {
        path: "/forgot-password",
        element: useLazy(<ForgotPassword />),
    },
];
