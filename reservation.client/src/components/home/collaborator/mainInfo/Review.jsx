import { Card } from "antd";
import React from "react";

const { Meta } = Card;

export default function Review({ order }) {
    console.log(order)
    return (
        <>
            <h3>{order.times}</h3>
            <h3>{order.offer}</h3>
            <h3>{}</h3>
            <Card
                style={{
                    width: "100%",
                }}
            >
                <Meta
                    title={order.name}
                    description={order.review.title}
                >
                </Meta>
                asasa
            </Card>
        </>
    );
}
