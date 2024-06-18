import React, { useState } from "react";
import { Modal, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { render } from "react-dom";
import { showMoney } from "../../../lib/helper";
import { PAYMENT_TYPES } from "../../../constant/settings";

const JobTable = ({ data }) => {
    const [open, setOpen] = useState(false)

    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            render: (text) => {
                return <a>{text}</a>;
            },
        },
        {
            title: "Cast",
            dataIndex: "cast",
            key: "cast",
            render: (value) => showMoney(value)
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentType",
            key: "cast",
            render: (value) => PAYMENT_TYPES[value]
        },
        {
            title: "Ngày thực hiện",
            dataIndex: "dateTime",
            key: "dateTime",
            render: (date) => dayjs(date).format("DD-MM-YYYY"),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    
    return (
        <>
            <Table columns={columns} dataSource={data} rowKey={"id"}/>
            {
                open && <Modal open={true}>
                    
                </Modal>
            }
        </>
    );
};
export default JobTable;
