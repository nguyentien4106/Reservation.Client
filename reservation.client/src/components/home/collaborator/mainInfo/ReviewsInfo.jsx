import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { ContainerInfoProfile } from "@/pages/home/collaborator/CollaboratorPage";
import { Card, Divider, Spin } from "antd";

const ReviewCard = lazy(() => import("./Review"));

export default function ReviewsInfo() {
    const collaborator = useContext(ContainerInfoProfile);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (collaborator) {
            setOrders(collaborator.orders.filter(item => item.review !== null));
        }
    }, [collaborator]);

    return (
        <div>
            <h1>Đánh giá</h1>
            {orders.length ? orders.map((order) => (
                <React.Fragment key={order.id}>
                    <Suspense fallback={<Spin />}>
                        <ReviewCard order={order} />
                    </Suspense>
                    <Divider />
                </React.Fragment>
            )) : <h3 style={{
                color: "red"
            }}>Chưa có đánh giá nào</h3>}
        </div>
    );
}
