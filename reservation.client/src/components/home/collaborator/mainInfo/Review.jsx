import { Avatar, Card, Flex, Image, Rate, Spin, Typography } from "antd";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { R2 } from "../../../../lib/R2";
import { getUser, getUserName } from "../../../../lib/helper";
import { ContainerInfoProfile } from "../../../../pages/home/collaborator/CollaboratorPage";

const { Meta } = Card;

export default function Review({ order }) {
    const [expand, setExpand] = useState(false);
    const [images, setImages] = useState([]);
    console.log(order)
    console.log(getUser())
    useEffect(() => {
        R2.getReviewImages(getUserName(order.collaboratorEmail), order.id).then(
            (res) => {
                setImages(res.map((item) => item.url));
            }
        );
    }, []);

    return (
        <>
            <Card
                style={{
                    width: "100%",
                }}
            >
                <Meta
                    avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                    }
                    title={
                        <Flex justify="space-between">
                            <Typography.Text>{order.name && order.name.trim() !== "" ? order.name : "Anonymous"}</Typography.Text>
                            <Rate
                                defaultValue={order.review?.rate}
                                disabled
                            ></Rate>
                        </Flex>
                    }
                    description={
                        <Flex justify="space-between">
                            <Typography.Text>
                                {dayjs(order.createdDate).format(
                                    "HH:mm DD/MM/YYYY"
                                )}
                            </Typography.Text>
                            <Typography.Text>{`(Thuê ${order.times}h)`}</Typography.Text>
                        </Flex>
                    }
                    className="a"
                ></Meta>
                <Typography.Paragraph
                    style={{
                        padding: 5,
                        marginTop: 10,
                    }}
                    ellipsis={{
                        rows: 2,
                        expandable: "collapsible",
                        expand,
                        onExpand: (_, info) => setExpand(info.expanded),
                    }}
                >
                    {order.review?.description}
                    <Flex
                        gap={20}
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    >
                        {images.map((image) => (
                            <Image height={100} src={image} preview={false} fallback={<Spin />}/>
                        ))}
                    </Flex>
                </Typography.Paragraph>
            </Card>
        </>
    );
}
