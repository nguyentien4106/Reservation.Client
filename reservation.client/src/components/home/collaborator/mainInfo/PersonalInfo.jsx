import React, { useContext } from "react";
import { ContainerInfoProfile } from "../../../../pages/home/collaborator/CollaboratorPage";
import { Space, Flex, Divider, Typography } from "antd";
import { getYear } from "../../../../lib/helper";
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
];

function PersonalInfo() {
    const collaborator = useContext(ContainerInfoProfile);

    const servicePanel = (service) => (
        <div className="service-panel text-header" key={service}>
            <Text style={{ color: "white" }}>{service}</Text>
        </div>
    );
    return (
        <>
            <h2 style={{ textAlign: "center" }}>{collaborator?.nickName}</h2>
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
                            servicePanel(item.name)
                        )}
                    </Flex>
                </Space>
                <Space direction="vertical">
                    <Text className="text-header text-center">
                        Các dịch vụ khác
                    </Text>
                    <Text className="text-value">
                        {collaborator?.otherServices}
                    </Text>
                </Space>
            </Flex>
        </>
    );
}

export default PersonalInfo;
