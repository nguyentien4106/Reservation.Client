import React, { useContext } from "react";
import { ContainerInfoProfile } from "@/pages/home/collaborator/CollaboratorPage";
import { Flex, Modal, Space, Typography } from "antd";
import { getUser } from "../../../../lib/helper";
import OrderContent from "./OrderContent";

function BookingInfo() {
    const collaborator = useContext(ContainerInfoProfile);
    const [modal, contextHolder] = Modal.useModal();

    const user = getUser();

    const handleOrder = () => {
        modal.info({
            title: user ? "Thông tin yêu cầu" : "Bạn chưa đăng nhập.",
            content: (
                <OrderContent
                    defaultPrice={collaborator?.pricePerHour}
                    collaboratorEmail={collaborator?.email}
                    collaboratorId={collaborator?.id}
                    collaboratorServices={collaborator.collaboratorServices}
                    modal={modal}
                    nickName={collaborator?.nickName}
                />
            ),
            width: user ? "60%" : "30%",
            okText: "Huỷ",
            okType: "default",
        });
    };

    return (
        <>
            {contextHolder}
            <Flex vertical gap={30}>
                {collaborator?.isReady ? (
                    <button className="button-booking" onClick={handleOrder}>
                        Thuê
                    </button>
                ) : (
                    <button
                        className="button-booking"
                        style={{
                            backgroundColor: "#938281",
                        }}
                    >
                        Người này chưa sẵn sàng
                    </button>
                )}
            </Flex>
        </>
    );
}

export default BookingInfo;
