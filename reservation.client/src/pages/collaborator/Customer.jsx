import React, { useContext, useEffect, useState } from "react";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH } from "../../constant/urls";
import { COLLABORATOR_ROUTE_PATH } from "../../constant/paths";
import { UserContext } from "../../context/useUserContext";
import { Flex, Typography } from "antd";
import AuthorizeView from "../../components/auth/AuthorizeView";
import { ROLES } from "../../constant/settings";
import { Link } from "react-router-dom";
import CollaboratorOrders from "../../components/collaborator/customer/CollaboratorOrders";
const { Title } = Typography

export default function Customer() {
    const { user } = useContext(UserContext)
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        if (user.collaboratorId)
            DataService.get(COLLABORATOR_PATH.getRequests + user.collaboratorId).then(res => {
                setCustomers(res.data.data)
                console.log(res.data.data)
            }).catch(console.error)
    }, [])

    return (
        <AuthorizeView role={ROLES.USER}>
            <Flex justify="space-between">
                <Title>Khách hàng</Title>
                <Link to={COLLABORATOR_ROUTE_PATH.setting}>
                    <h2>Chỉnh sửa hồ sơ</h2>
                </Link>
            </Flex>
            <CollaboratorOrders src={customers} />
        </AuthorizeView>
    );
}
