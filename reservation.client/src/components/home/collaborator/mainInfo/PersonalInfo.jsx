import React, { useContext } from "react";
import { ContainerInfoProfile } from "../../../../pages/home/collaborator/CollaboratorPage";
import { Space, Flex, Divider, Typography } from "antd";
import { getYear, showMoney, showNumber } from "../../../../lib/helper";
import { EyeOutlined } from "@ant-design/icons";
const { Text } = Typography;

const getItem = ({ label, value }) => (
    <Space
        key={label}
        direction="vertical"
        style={{ flexGrow: 1, width: "33%" }}
    >
        <Text className="text-header">{label}</Text>
        <Text className="text-value">{value}</Text>
    </Space>
);

const items = (collaborator) => [
    {
        label: "Tỉnh/Thành Phố",
        value: collaborator?.city,
    },
    {
        label: "Quận/Huyện",
        value: collaborator?.district,
    },
    {
        label: "Năm Sinh",
        value: getYear(collaborator?.birthDate),
    },
    {
        label: "Nghề Nghiệp",
        value: collaborator?.job,
    },
    {
        label: "Chiều Cao",
        value: collaborator?.height,
    },
    {
        label: "Cân nặng",
        value: collaborator?.weight,
    },
    {
        label: "Giới tính",
        value: collaborator?.sex === "Female" ? "Nữ" : "Nam",
    },
];

function PersonalInfo() {
    const collaborator = useContext(ContainerInfoProfile);
    const servicePanel = (service) => (
        <div className="service-panel text-header" key={service.name}>
            <Space>
                <Text style={{ color: "white" }}>{service.name}</Text>
                <Text style={{ color: "rgb(60, 118, 52, 1)" }}>
                    {showMoney(service.price)}/h
                </Text>
            </Space>
        </div>
    );
    return (
        <>
            <Flex justify="space-between">
                <h2 style={{ textAlign: "center" }}>
                    {collaborator?.nickName}
                </h2>

                <Space style={{ fontSize: 20 }}>
                    <EyeOutlined />
                    <Text style={{ textAlign: "center", fontWeight: 700, fontSize: 16 }}>
                        {showNumber(collaborator?.view.count)}
                    </Text>
                </Space>
            </Flex>
            <Divider />
            <Flex gap="middle" wrap={true}>
                {items(collaborator).map((item) => getItem(item))}
            </Flex>
            <Divider />
            <Flex gap={"middle"} vertical>
                <Space direction="vertical">
                    <Text className="text-header text-center">Các dịch vụ</Text>
                    <Flex gap="middle" wrap={true}>
                        {collaborator?.collaboratorServices?.map((item) =>
                            servicePanel(item)
                        )}
                    </Flex>
                </Space>
                <Space direction="vertical">
                    <Text className="text-header text-center">
                        Các dịch vụ khác
                    </Text>
                    <Text className="text-value">
                        {collaborator?.otherServices ?? "Không có dịch vụ thêm"}
                    </Text>
                </Space>
            </Flex>
        </>
    );
}

export default PersonalInfo;
