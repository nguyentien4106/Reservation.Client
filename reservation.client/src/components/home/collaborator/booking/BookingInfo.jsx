import React, { useContext, useState } from "react";
import { ContainerInfoProfile } from "@/pages/home/collaborator/CollaboratorPage";
import { Flex, Modal, Space, Typography } from "antd";
import { showMoney, showNumber } from "@/lib/helper";
import { EyeOutlined } from "@ant-design/icons";
import DataService from "@/lib/DataService";
import { getUser } from "../../../../lib/helper";
import { useNavigate } from "react-router-dom";
import OrderContent from "./OrderContent";
const { Text } = Typography;

const defaultPhone = "Hiển thị số điện thoại";

function BookingInfo() {
    const collaborator = useContext(ContainerInfoProfile);
    const [modal, contextHolder] = Modal.useModal();

    const user = getUser();

    const handleOrder = () => {
        modal.info({
            title: user ? "Thông tin yêu cầu" : "Bạn chưa đăng nhập.",
            content: <OrderContent 
                        defaultPrice={collaborator?.pricePerHour} 
                        collaboratorEmail={collaborator?.email}
                        collaboratorId={collaborator?.id}
                        collaboratorServices={collaborator.collaboratorServices}
                        modal={modal}
                        nickName={collaborator?.nickName}
                    />,
            width: user ? "60%" : "30%",
            okText: "Huỷ",
            okType: "default"
        })

    }

    return (
        <>
            {contextHolder}
            <Flex vertical gap={30}>
                <Space style={{ fontSize: 20 }}>
                    <Text style={{ textAlign: "center" }}>
                        {showNumber(collaborator?.view.count)}
                    </Text>
                    <EyeOutlined />
                </Space>
                <button
                    className="button-booking"
                    onClick={ handleOrder}
                >
                    Thuê
                </button>
            </Flex>
        </>
    );
}

export default BookingInfo;
