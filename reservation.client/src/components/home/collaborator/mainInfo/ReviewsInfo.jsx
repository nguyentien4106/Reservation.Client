import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { ContainerInfoProfile } from "@/pages/home/collaborator/CollaboratorPage";
import { Card, Spin } from "antd";

const ReviewCard = lazy(() => import("./Review"))

export default function ReviewsInfo() {
    const collaborator = useContext(ContainerInfoProfile);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if(collaborator){
            setOrders(collaborator.orders)
        }
    }, [collaborator])

    return (
        <div>
            <h1>Reviews</h1>
            {
                orders.map(order => (
                    <Suspense fallback={<Spin />} key={order.id}>
                        <ReviewCard order={order} />
                    </Suspense>
                ))
            }
        </div>
    );
}

