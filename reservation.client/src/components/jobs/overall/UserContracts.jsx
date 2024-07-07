import { Button, Flex, Image, Modal, Spin, Table } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { R2 } from "@/lib/R2.js";
import { getUserName } from "../../../lib/helper";

export default function UserContracts({ contracts }) {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    const columns = [
        {
            title: "Họ",
            key: "title",
            render: (_, contract) => contract?.applicationUser?.firstName,
        },
        {
            title: "Tên",
            key: "title",
            render: (_, contract) => contract?.applicationUser?.lastName,
        },
        {
            title: "Thông tin thêm",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Liên lạc",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (date) => dayjs(date).format("DD-MM-YYYY"),
        },
        {
            title: "Talent",
            key: "Talent",
            render: (_, contract) =>
                contract.applicationUser?.collaborator ? (
                    <Link
                        to={`/collaborators/${contract.applicationUser?.collaborator?.id}`}
                        target="_blank"
                    >
                        Hồ sơ ứng vien
                    </Link>
                ) : (
                    <Button
                        onClick={() =>
                            getImages(contract.applicationUser, contract.jobId)
                        }
                    >
                        Xem ảnh ứng viên
                    </Button>
                ),
        },
        {
            title: "Action",
            key: "action",
        },
    ];

    const getImages = (user, jobId) => {
        setOpen(true);
        R2.getJobImages(getUserName(user?.userName), jobId).then((res) => {
            setImages(res.map((item) => item?.url));
        });
    };
    return (
        <>
            <h2>Danh sách ứng viên</h2>
            <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
                <Flex
                    gap={20}
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    {images.map((image) => (
                        <Image
                            height={200}
                            src={image}
                            preview={false}
                            fallback={<Spin />}
                        />
                    ))}
                </Flex>
            </Modal>
            <Table columns={columns} dataSource={contracts}></Table>
        </>
    );
}
