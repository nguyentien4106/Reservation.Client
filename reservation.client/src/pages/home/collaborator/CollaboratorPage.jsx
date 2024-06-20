import React, { createContext } from "react";
import { Link, useParams } from "react-router-dom";
import UseFetchCollaborator from "@/hooks/useFetchCollaborator";
import AvatarImage from "../../../components/home/collaborator/AvatarImage";
import "./index.css";
import MainInfo from "../../../components/home/collaborator/mainInfo/MainInfo";
import BookingInfo from "../../../components/home/collaborator/booking/BookingInfo";
import { Flex, Space } from "antd";
import { ACCOUNT_ROUTE_PATH } from "../../../constant/paths";

export const ContainerInfoProfile = createContext({});

function CollaboratorPage() {
    const { id } = useParams();
    if (id === "null") {
        return (
            <>
                <Flex justify="center">
                    <Space direction="vertical">
                        <strong>Bạn chưa có hồ sơ Talent </strong>
                        <Link to={ACCOUNT_ROUTE_PATH.collaboratorSetting}>
                            <strong>Tạo hồ sơ Talent</strong>
                        </Link>
                    </Space>
                </Flex>
            </>
        );
    }
    const collaborator = UseFetchCollaborator(id);
    return (
        <ContainerInfoProfile.Provider value={collaborator}>
            <div className="collaborator-infor__container">
                <div className="avatar">
                    <AvatarImage style={{ flex: 1, marginTop: "50px" }} />
                </div>
                <div style={{ flex: 3 }} className="personal-info">
                    <MainInfo />
                </div>
                <div style={{ flex: 1 }} className="booking-info">
                    <BookingInfo />
                </div>
            </div>
        </ContainerInfoProfile.Provider>
    );
}

export default CollaboratorPage;
