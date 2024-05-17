import React from "react";
import { Space, Table, Tag, Typography } from "antd";
const { Column } = Table;
import { Link } from "react-router-dom";

const ActionTypes = {
    Deny: 0,
    Approved: 1,
};

const DataTable = ({ collaborators }) => {
    console.log(collaborators);
    const handleAction = (collaboratorId, type) => {
        console.log(collaboratorId, type);
    };

    return (
        <Table dataSource={collaborators}>
            <Column
                title="Id"
                dataIndex="collaboratorId"
                render={(text, collaborator) => {
                    return (
                        <Link to={`/collaborator/${collaborator.id}`}>
                            Details
                        </Link>
                    );
                }}
            />
            <Column
                title="Ready"
                dataIndex="isReady"
                render={(text, collaborator) => (
                    <Tag color={collaborator.isReady ? "green" : "red"}>
                        {collaborator.isReady ? "Yes" : "No"}
                    </Tag>
                )}
            />
            <Column title="Nick Name" dataIndex="nickName" />
            <Column title="Phone" dataIndex="phoneNumber" key="phoneNumber" />
            <Column title="Email" dataIndex="email" key="email" />
            <Column
                title="Action"
                key="action"
                render={(_, collaborator) => (
                    <Space size="middle">
                        <Tag color={"green"}>
                            <a
                                onClick={() =>
                                    handleAction(
                                        collaborator.id,
                                        ActionTypes.Approved
                                    )
                                }
                            >
                                Approved
                            </a>
                        </Tag>
                        <Tag color={"red"}>
                            <a
                                onClick={() =>
                                    handleAction(
                                        collaborator.id,
                                        ActionTypes.Deny
                                    )
                                }
                            >
                                Deny
                            </a>
                        </Tag>
                    </Space>
                )}
            />
        </Table>
    );
};
export default DataTable;
