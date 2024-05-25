import React, { useEffect, useState } from "react";
import { App, Space, Table, Tag, Typography, Popconfirm } from "antd";
import { generateMessages, showMoney } from "../../../lib/helper";
import DataService from "@/lib/DataService";
import { COLLABORATOR_PATH } from "../../../constant/urls";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";
import dayjs from "dayjs";

const { Column } = Table;
const { Text } = Typography
const ActionTypes = {
    Denied: 1,
    Approved: 2,
};

const title = (
    <Text style={{
        maxWidth: "300px",
        width: 300
    }}>
        Bạn cần liên hệ lại khách hàng theo thông tin liên lạc trong thời gian sớm nhất tránh bị report hoặc đánh giá không tốt.
    </Text>
)
const renderAction = (customer, handleAction) => {
    if (!customer.status) {
        return (
            <Space size="middle">
                <Popconfirm title={title} onConfirm={() => handleAction(customer, ActionTypes.Approved)}>
                    <Tag color={"green"}>
                        <a>Chấp nhận</a>
                    </Tag>
                </Popconfirm>
                <Tag color={"red"}>
                    <a onClick={() => handleAction(customer, ActionTypes.Denied )}>
                        Từ chối
                    </a>
                </Tag>
            </Space>
        )
    }

    if (customer.status === 1) {
        return (
            <Tag color={"red"}>
                <a>
                    Đã từ chối
                </a>
            </Tag>
        )
    }

    return (
        <Tag color={"green"}>
            <a>
                Đã chấp nhận
            </a>
        </Tag>
    )

}

const CustomerTable = ({ customers }) => {
    const { message } = App.useApp();
    const dispatch = useDispatch()

    const [source, setSource] = useState([])

    useEffect(() => {
        setSource(customers)
    }, [customers])
    const handleAction = (customer, status) => {
        dispatch(show())
        const queryString = `requestId=${customer.id}&status=${status}`
        DataService.get(COLLABORATOR_PATH.confrimRequest + queryString)
            .then(res => {
                const { data } = res
                console.log(data)
                setSource(prev => prev.map(item => item.id === data.data.id ? data.data : item))
                if (data.isSucceed) {
                    message.success("Đã xác nhận thành công")
                }
                else {
                    message.error(generateMessages(data.messages))
                }
            })
            .catch(err => {
                message.error(err)
            })
            .finally(() => {
                dispatch(hide())
            })
    };

    return (
        <Table dataSource={source}>
            <Column title="Tên" dataIndex="name" />
            <Column title="Email" dataIndex="email" />
            <Column title="Số điện thoại" dataIndex="phoneNumber" />
            <Column
                title="Giá mỗi giờ"
                render={(_, customer) => showMoney((+customer.offer))}
            />
            <Column title="Số giờ cần thuê" dataIndex="times" />
            <Column
                title="Thành tiền"
                render={(_, customer) => showMoney((+customer.times) * (+customer.offer))}
            />
            <Column title="Yêu cầu thêm" dataIndex="description" />
            <Column title="Thông tin zalo" dataIndex="zalo" />
            <Column title="Ngày yêu cầu"
                render={(_, customer) => dayjs(customer.createdDate).format("DD-MM-YYYY HH:mm:ss A")}
            />
            <Column title="Ngày xác nhận"
                render={(_, customer) => customer.confirmedDate ? dayjs(customer.confirmedDate).format("DD-MM-YYYY HH:mm:ss A") : ""}
            />
            <Column
                title="Action"
                key="action"
                render={(_, customer) => renderAction(customer, handleAction)}
            />
        </Table>
    );
};
export default CustomerTable;
