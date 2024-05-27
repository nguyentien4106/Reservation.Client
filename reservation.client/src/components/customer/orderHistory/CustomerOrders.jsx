import React, { Suspense, lazy } from "react";
import { App, Button, Modal, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import ReviewContent from "./ReviewContent";
import OrderTable from "../../common/OrderTable";

const renderAction = (customer) => {
    let color, text;

    switch (customer.status) {
        case 1:
            color = "red";
            text = "Đã từ chối";
            break;
        case 0:
            color = "green";
            text = "Đã gửi";
            break;
        default:
            color = "green";
            text = "Đã chấp nhận";
            break;
    }

    return <Tag color={color}>{text}</Tag>;
};

const sort = (a, b) => b.status - a.status

function CustomerOrders({ src }) {
    const { message } = App.useApp()
    const postReview = order => {
        console.log(order)
        Modal.info({
            title: `Review về ${order.nickName}`,
            content: <ReviewContent message={message} order={order} />,
            width: "60%",
            okText: "Huỷ",
            okType: "default"
        })
    }

    return (
        <OrderTable src={src} renderAction={(_, order) => renderAction(order)} title="Trạng thái" sort={sort}>
            <Table.Column
                title="Review"
                key="review"
                render={(_, order) => {
                    if(order.status === 2){
                        return order?.review ? <Link to={`/collaborators/${order.collaboratorId}`}>Đã review</Link> : <Button onClick={() => postReview(order)}>Đăng review</Button>
                    }

                    return order.status === 0 ? <Tag color={"green"}><a>Review khi được chấp thuận</a></Tag> : <Tag color={"red"}><a>Không được review</a></Tag>
                }}
            />
            <Table.Column
                title="Người cho thuê"
                key="collaborator"
                render={(_, order) => {
                    return <Link target="_blank" to={`/collaborators/${order.collaboratorId}`}>{order.nickName}</Link>;
                }}
            />
        </OrderTable>
    );
}

export default CustomerOrders;
