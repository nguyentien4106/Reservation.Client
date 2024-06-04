import { Button, Card, Flex, Space } from "antd";
import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { COLLABORATOR_ROUTE_PATH, CUSTOMER_ROUTE_PATH } from "../../constant/paths";
export default function ACtion() {
    const navigate = useNavigate()

    return (
        <div style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100%",
            marginTop: "10%"
        }}>
            <Flex gap={50} vertical justify="center">
                <a onClick={() => navigate(COLLABORATOR_ROUTE_PATH.setting)} className="card">
                    <Space direction="vertical">
                        <p className="heading gtm-margin-xxs">Việc tìm người</p>
                        <p className="text">
                            Bạn cần tìm một người để phù hợp với yêu cầu của
                            bạn.
                        </p>
                    </Space>
                </a>
                <a onClick={() => navigate(COLLABORATOR_ROUTE_PATH.setting)} className="card">
                    <Space direction="vertical">
                        <p className="heading gtm-margin-xxs">Người tìm việc</p>
                        <p className="text">
                            Bạn muốn tạo một hồ sơ để người khác có thể tìm thấy
                            bạn và thuê.
                        </p>
                    </Space>
                </a>
            </Flex>
        </div>
    );
}
