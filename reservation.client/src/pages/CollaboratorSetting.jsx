import React, { useEffect, useState } from "react";
import {
    Grid,
} from "antd";
import AuthorizeView from "../components/AuthorizeView";
import { getLocal } from "../lib/helper";
import DataService from "../lib/DataService";
import UploadComponent from "../components/collaborator/UploadComponent";
import Profile from "../components/collaborator/Profile";
const { useBreakpoint } = Grid;

const UserServicesRegister = () => {
    const [user, setUser] = useState(null);
    const email = getLocal("email");
    const [turnOn, setTurnOn] = useState(true);
    const { screens } = useBreakpoint();

    useEffect(() => {
        DataService.get("Collaborator/GetUser?email=" + email).then((res) => {
            const { data } = res.data;
            console.log('user', data)
            setUser(data);
        });
    }, []);

    const turnedOnProfile = (on) => {
        setTurnOn(on);
    };

    const onFinish = (values) => {
        DataService.post("Collaborator/Register", values).then((res) => {
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
                        turnedOnProfile={turnedOnProfile}
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
                            // marginLeft: "30%",
                            textAlign: "center"
                        }}
                    >
                        Albums{" "}
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
