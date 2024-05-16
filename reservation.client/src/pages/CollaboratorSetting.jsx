import React, { useEffect, useState } from "react";
import AuthorizeView from "../components/AuthorizeView";
import { getLocal } from "../lib/helper";
import DataService from "../lib/DataService";
import UploadComponent from "../components/collaborator/UploadComponent";
import Profile from "../components/collaborator/Profile";

const UserServicesRegister = () => {
    const [userId, setUserId] = useState(null);
    const [province, setProvince] = useState("")
    const email = getLocal("email");

    useEffect(() => {
        DataService.get("Collaborator/GetUser?email=" + email).then((res) => {
            const { data } = res.data;
            console.log('userid', data)
            setUserId(data);
        });
    }, []);

    const onFinish = (values) => {
        const services = values.collaboratorServices && values.collaboratorServices.map(item => ({ serviceId: item, collaboratorId: userId}))

        const params = {...values, applicationUserId: userId, collaboratorServices: services, province: province}
        DataService.post("Collaborator/Register", params).then((res) => {
            console.log(res);
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
