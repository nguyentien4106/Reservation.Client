import React from "react";
import { App, Space, Table, Tag, Typography } from "antd";
const { Column } = Table;
import { Link } from "react-router-dom";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH } from "../../constant/urls";
import { generateMessages } from "../../lib/helper";

const ActionTypes = {
    Denied: -1,
    Verified: 2,
};

const DataTable = ({ collaborators }) => {
    const { message } = App.useApp();

    const handleAction = (collaboratorId, status) => {
        DataService.post(COLLABORATOR_PATH.changeStatus, {
            collaboratorId: collaboratorId,
            status: status
        }).then(res => {
            if(res.data.isSucceed){
                message.success(res.data.data)
            }
            else{
                message.error(generateMessages(res.data.messages))
            }
        }).catch(err => console.log(err))
    };

    return (
        <Table dataSource={collaborators}>
            <Column
                title="Id"
                dataIndex="collaboratorId"
                render={(text, collaborator) => {
                    return (
                        <Link to={`/collaborator/${collaborator.id}`} target="_blank">
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
                                        ActionTypes.Verified
                                    )
                                }
                            >
                                Verified
                            </a>
                        </Tag>
                        <Tag color={"red"}>
                            <a
                                onClick={() =>
                                    handleAction(
                                        collaborator.id,
                                        ActionTypes.Denied
                                    )
                                }
                            >
                                Denied
                            </a>
                        </Tag>
                    </Space>
                )}
            />
        </Table>
    );
};
export default DataTable;
