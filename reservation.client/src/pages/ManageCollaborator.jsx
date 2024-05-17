import React, { useEffect, useState } from "react";
import AuthorizeView from "../components/AuthorizeView";
import { ROLES } from "../constant/settings";
import DataService from "../lib/DataService";
import { COLLABORATOR_PATH } from "../constant/urls";
import DataTable from "../components/manageCollaborator/DataTable";
import { useDispatch } from "react-redux";
import { hide, show } from "../state/loading/loadingSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ManageCollaborator() {
    const [collaborators, setCollaborators] = useState([])
    const dispatch = useDispatch()
    const naviagate = useNavigate()

    useEffect(() => {
        dispatch(show())
        DataService.get(COLLABORATOR_PATH.getAll).then(response => {
            setCollaborators(response.data.data)
        })
        .catch(err => {
            console.log(err)
        }).finally(() => {
            dispatch(hide())

        })
    }, [])

    return (
        <AuthorizeView role={ROLES.ADMIN}>
            <h1>Manage Collaborator</h1>
            <DataTable collaborators={collaborators} />
        </AuthorizeView>
    );
}
