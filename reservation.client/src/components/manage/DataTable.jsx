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

const DataTable = ({ users }) => {
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
    console.log(users)

    return (
        <Table dataSource={users}>
            <Column
                title="Id"
                dataIndex="id"
                render={(text, user) => text.substring(0, 8)}
            />
            <Column
                title="Profile"
                render={(text, user) => {
                    return user?.collaborator ?  (
                        <Link to={`/collaborators/${user?.collaborator.id}`} target="_blank">
                            Profile
                        </Link>
                    ) : <strong>No profile</strong>
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
            <Column title="Email" dataIndex="email" key="email" />
            <Column title="Phone" dataIndex="phoneNumber" key="phoneNumber" />
            <Column title="First Name" dataIndex="firstName" />
            <Column title="Last Name" dataIndex="lastName" />
            <Column title="Nick Name" dataIndex="nickName" />
            <Column title="Joined Date" dataIndex="joinedDate" key="joinedDate" />
            {/* <Column
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
            /> */}
        </Table>
    );
};
export default DataTable;
