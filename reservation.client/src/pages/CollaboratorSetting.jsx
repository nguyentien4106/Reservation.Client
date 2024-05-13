import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    Typography,
    DatePicker,
    Switch,
} from "antd";
import AuthorizeView from "../components/AuthorizeView";
import { getLocal } from "../lib/helper";
import DataService from "../lib/DataService";
import UploadComponent from "../components/collaborator/UploadComponent";
import Profile from "../components/collaborator/Profile";
const { Text } = Typography;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "${label} phải nhập!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};

const UserServicesRegister = () => {
    const [user, setUser] = useState(null);
    const email = getLocal("email");
    const [turnOn, setTurnOn] = useState(false);

    useEffect(() => {
        DataService.get("Collaborator/GetUser?email=" + email).then((res) => {
            const { data } = res.data;
            setUser(data);
        });
    }, []);

    const turnedOnProfile = (on) => {
        setTurnOn(on);
    };

    return (
        <AuthorizeView>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <div style={{ flex: 1 }}>
                    <h2
                        style={{
                            marginLeft: "30%",
                        }}
                    >
                        Hồ sơ
                    </h2>
                    <Profile
                        onFinish={onFinish}
                        turnedOnProfile={turnedOnProfile}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    {turnOn && (
                        <>
                            <h2>Albums </h2>
                            <UploadComponent />
                        </>
                    )}
                </div>
            </div>
        </AuthorizeView>
    );
};

export default () => <UserServicesRegister />;
