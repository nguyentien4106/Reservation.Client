import React, { useEffect, useState } from "react";
import AuthorizeView from "../components/AuthorizeView";
import { generateMessages, getLocal } from "../lib/helper";
import DataService from "../lib/DataService";
import UploadComponent from "../components/collaborator/UploadComponent";
import Profile from "../components/collaborator/Profile";
import { COLLABORATOR_PATH } from "../constant/urls";
import { App } from "antd";
import useFetchUser from "../hooks/useFetchUser";
import { ROLES } from "../constant/settings";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../context/useProfileContext";

const UserServicesRegister = () => {
    const [collaborator, setCollaborator] = useState({
        id: "",
        applicationUserId: "",
    });
    const [collaboratorId, setCollaboratorId] = useState("")
    const user = useFetchUser();
    const { message } = App.useApp();
    const [initialValues, setInitialValues] = useState({});
    const { id } = useParams();

    useEffect(() => {
        let newCollaboratorId;
        if (user) {
            newCollaboratorId = user.collaboratorId;
        }

        if (id) {
            newCollaboratorId = id;
        }

        setCollaboratorId(newCollaboratorId)

       
    }, [id, user]);

    useEffect(() => {
        if (collaboratorId) {
            DataService.get(COLLABORATOR_PATH.getProfile + collaboratorId).then(
                (res) => {
                    const { data } = res.data;
                    setCollaborator(data);
                    setInitialValues(data);
                }
            );
        }
    }, [collaboratorId])

    const onFinish = (values) => {
        const services =
            values.collaboratorServices &&
            values.collaboratorServices.map((item) => ({
                serviceId: item,
                collaboratorId: collaboratorId,
            }));

        const params = {
            ...values,
            applicationUserId: user?.id,
            collaboratorServices: services,
            city: values.city,
            id: collaboratorId
        };

        const url = collaboratorId
            ? COLLABORATOR_PATH.update
            : COLLABORATOR_PATH.add;

        DataService.post(url, params).then((res) => {
            const { data } = res;
            message.open({
                type: data.isSucceed ? "success" : "error",
                content: data.isSucceed
                    ? data.data
                    : generateMessages(data.messages),
                duration: 5,
            });
        });
    };

    return (
        <AuthorizeView role={ROLES.USER}>
            <ProfileContext.Provider value={{ collaborator}}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: 20,
                    }}
                    className="collaborator-setting"
                >
                    <div
                        style={{
                            flex: 3,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 30,
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Hồ sơ
                        </h2>
                        <Profile
                            onFinish={onFinish}
                            initialValues={initialValues}
                        />
                    </div>
                    <div
                        style={{
                            flex: 2,
                            backgroundColor: "#E8E8E8",
                            borderRadius: 30,
                        }}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Albums
                        </h2>
                        <div
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                            }}
                        >
                            <UploadComponent
                                max={1000}
                                buttonTitle={"Cập nhật Albums"}
                                collaborator={collaborator}
                            />
                        </div>
                    </div>
                </div>
            </ProfileContext.Provider>
        </AuthorizeView>
    );
};

export default () => <UserServicesRegister />;
