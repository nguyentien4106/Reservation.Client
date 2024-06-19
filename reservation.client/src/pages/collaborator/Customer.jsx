import React, { useContext, useEffect, useState } from "react";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH, ORDER_PATH } from "../../constant/urls";
import { ACCOUNT_ROUTE_PATH, COLLABORATOR_ROUTE_PATH } from "../../constant/paths";
import { Flex, Typography } from "antd";
import AuthorizeView from "../../components/auth/AuthorizeView";
import { ROLES } from "../../constant/settings";
import { Link } from "react-router-dom";
import CollaboratorOrders from "../../components/collaborator/customer/CollaboratorOrders";
import { useSelector } from "react-redux";
import "./customer.css"
const { Title } = Typography

export default function Customer() {
    const { user } = useSelector(store => store.user)
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        if (user?.collaboratorId)
            DataService.get(ORDER_PATH.getCollaboratorOrders + user.collaboratorId).then(res => {
                setCustomers(res.data.data)
            }).catch(console.error)
    }, [user])

    return (
        <AuthorizeView role={ROLES.USER}>
            <Flex justify="space-between" className="customer-header">
                <Title>Khách hàng</Title>
                <Link to={ACCOUNT_ROUTE_PATH.collaboratorSetting}>
                    <h2>Chỉnh sửa hồ sơ</h2>
                </Link>
            </Flex>
            <CollaboratorOrders src={customers} />
        </AuthorizeView>
    );
}
