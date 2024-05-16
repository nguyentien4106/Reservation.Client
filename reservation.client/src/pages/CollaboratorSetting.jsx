import React, { useEffect, useState } from "react";
import AuthorizeView from "../components/AuthorizeView";
import { generateMessages, getLocal } from "../lib/helper";
import DataService from "../lib/DataService";
import UploadComponent from "../components/collaborator/UploadComponent";
import Profile from "../components/collaborator/Profile";
import { COLLABORATOR_PATH } from "../constant/urls";
import { App } from "antd";

const UserServicesRegister = () => {
    const [collaborator, setCollaborator] = useState({
        id: "",
        applicationUserId: ""
    });
    const [province, setProvince] = useState("")
    const email = getLocal("email");
    const { message } = App.useApp()
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        DataService.get(COLLABORATOR_PATH.getProfile + email).then((res) => {
            const { data } = res.data;
            setCollaborator(data);
            setInitialValues(data)
        });
    }, []);

    const onFinish = (values) => {
        const services = values.collaboratorServices && values.collaboratorServices.map(item => ({ serviceId: item, collaboratorId: collaborator?.id}))

        const params = {...values, applicationUserId: collaborator?.applicationUserId, collaboratorServices: services, city: values.city}

        const url = collaborator?.id ? COLLABORATOR_PATH.update : COLLABORATOR_PATH.add
        
        DataService.post(url, params).then((res) => {
            const { data } = res
            message.open({
                type: data.isSucceed ? "success" : "error",
                content:  data.isSucceed ? data.data : generateMessages(data.messages),
                duration: 5
            })
        });
    };

    return (
        <AuthorizeView>
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
                            textAlign: "center"
                        }}
                    >
                        Hồ sơ
                    </h2>
                    <Profile
                        onFinish={onFinish}
                        setProvince={setProvince}
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
                            textAlign: "center"
                        }}
                    >
                        Albums
                    </h2>
                    <div style={{
                        paddingLeft: 16,
                        paddingRight: 16
                    }}>
                        <UploadComponent />
                    </div>
                </div>
            </div>
        </AuthorizeView>
    );
};

export default () => <UserServicesRegister />;
