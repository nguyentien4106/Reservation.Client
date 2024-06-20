import React, { useEffect, useState } from "react";
import { Modal, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import { showMoney } from "../../../lib/helper";
import { PAYMENT_TYPES } from "../../../constant/settings";
import Job from "../Job";
import DataService from "../../../lib/DataService";
import UserContracts from "./UserContracts";
const UserContract = ({ contract }) => {
    return <div>{contract.id}</div>
}
const JobTable = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [contractsModal, setContractsModal] = useState(false);
    const [job, setJob] = useState(null);
    const [contracts, setContracts] = useState([])
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

    useEffect(() => {
        if(open){
            DataService.get(`Jobs/${job.id}/Contracts`).then(res => {
                setContracts(res.data.data)
            })
        }
    }, [open])

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey={"id"} style={{ overflow: "auto hidden"}}/>
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
                    <UserContracts contracts={contracts} />
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
                    <UserContracts contracts={contracts} />

                </Modal>
            )}
        </>
    );
};
export default JobTable;
