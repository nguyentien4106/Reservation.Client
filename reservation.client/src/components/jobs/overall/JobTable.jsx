import React, { useState } from "react";
import { Modal, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { render } from "react-dom";
import { showMoney } from "../../../lib/helper";
import { PAYMENT_TYPES } from "../../../constant/settings";
import Job from "../Job";

const JobTable = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [contractsModal, setContractsModal] = useState(false);
    const [job, setJob] = useState(null);

    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            render: (text, job) => {
                return <a onClick={() => {
                    setJob(job)
                    setOpen(true)
                }}>{text}</a>;
            },
        },
        {
            title: "Cast",
            dataIndex: "cast",
            key: "cast",
            render: (value) => showMoney(value),
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "paymentType",
            key: "cast",
            render: (value) => PAYMENT_TYPES[value],
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
                    <a onClick={() => {
                        setContractsModal(true)
                        setJob(record)
                    }}>Xem danh sách ứng viên</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey={"id"} />
            {open && (
                <Modal
                    open={true}
                    onCancel={() => {
                        setJob(null);
                        setOpen(false);
                    }}
                    footer={null}
                    width={"70%"}
                >
                    <Job job={job} renderApplyButton={false}></Job>
                </Modal>
            )}
            {contractsModal && (
                <Modal
                    open={true}
                    onCancel={() => {
                        setContractsModal(false);
                    }}
                    footer={null}
                    width={"70%"}
                >
                    {
                        job && job.contracts.map(item => <h3>{item.applicationUserId}</h3>)
                    }
                </Modal>
            )}
        </>
    );
};
export default JobTable;
