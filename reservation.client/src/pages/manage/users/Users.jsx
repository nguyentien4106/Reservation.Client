import React, { useEffect, useState } from "react";
import { ROLES } from "@/constant/settings";
import DataService from "@/lib/DataService";
import DataTable from "@/components/manage/DataTable";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { useNavigate } from "react-router-dom";
import AuthorizeView from "@/components/auth/AuthorizeView";

export default function Users() {
    const [users, setUsers] = useState([])
    const dispatch = useDispatch()
    const naviagate = useNavigate()

    useEffect(() => {
        dispatch(show())
        DataService.get("Accounts").then(res => {
            console.log(res.data.data)
            setUsers(res.data.data)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            dispatch(hide())
        })
    }, [])

    return (
        <AuthorizeView role={ROLES.ADMIN}>
            <h1>Users</h1>
            <DataTable users={users} />
        </AuthorizeView>
    );
}
