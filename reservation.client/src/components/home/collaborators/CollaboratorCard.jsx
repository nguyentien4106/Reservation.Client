import React, { Suspense, lazy, useEffect, useState } from "react";
import { Card, Flex, Spin, Typography } from "antd";
import { R2 } from "../../../lib/R2";
import { getAge, getUserName } from "../../../lib/helper";
import { useNavigate } from "react-router-dom";
import CoverCardImage from "./CoverCardImage";
import {
    StarOutlined
} from '@ant-design/icons';
const { Meta } = Card;

const { Text } = Typography;

const CollaboratorCard = ({ collaborator }) => {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");

    useEffect(() => {
        R2.getAvatar(getUserName(collaborator.email))
            .then((res) => {
                setUrl(res.url);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const servicesTitle = collaborator?.collaboratorServices
        .map((item) => item.name)
        .join(", ");
    
    const title = (
        <Flex justify="space-between">
            <Text>{collaborator.nickName}</Text>
            <Text>{getAge(collaborator.birthDate)} Tuổi</Text>
            <Text>{collaborator.avgRate || 0} <StarOutlined color="yellow"/></Text>
        </Flex>
    );

    const metaTitle = (
        <>
            <Text>{collaborator.city}</Text>
            <br></br>
            <Text>{servicesTitle}</Text>
        </>
    );
    const image = (
        <Suspense fallback={<Spin />}>
            <CoverCardImage
                src={url}
                price={collaborator.pricePerHour}
                view={collaborator.view?.count ?? 0}
            />
        </Suspense>
    );

    const navigate = useNavigate();

    const handleChoose = () => {
        navigate(`/collaborators/${collaborator.id}`);
    };

    return (
        <Card
            loading={loading}
            hoverable
            style={{ width: "100%" }}
            cover={image}
            onClick={handleChoose}
            title={title}
        >
            <Meta title={metaTitle} description={collaborator.title} />
        </Card>
    );
};

export default CollaboratorCard;
