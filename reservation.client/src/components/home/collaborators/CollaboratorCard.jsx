import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Card, Spin, Typography } from 'antd';
import { R2 } from '../../../lib/R2';
import { getAge, getUserName } from '../../../lib/helper';
import { useNavigate } from 'react-router-dom';
import CoverCardImage from './CoverCardImage';
const { Meta } = Card;

const { Text } = Typography

const CollaboratorCard = ({ collaborator, services }) => {
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("")

    useEffect(() => {
        R2.getAvatar(getUserName(collaborator.email)).then(res => {
            setUrl(res.url)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const servicesTitle = collaborator?.collaboratorServices.map(item => item.name).join(", ")
    const title = `${collaborator.nickName} - ${getAge(collaborator.birthDate)} Tuổi`

    const metaTitle = (
        <>
            <Text>{collaborator.city}</Text>
            <br></br>
            <Text>{servicesTitle}</Text>
        </>
    )
    const image = (
        <Suspense fallback={<Spin />}>
            <CoverCardImage src={url} price={collaborator.pricePerHour}/>
        </Suspense>
    )

    const navigate = useNavigate()

    const handleChoose = () => {
        navigate(`/collaborators/${collaborator.id}`)
    }

    return (
        <Card
            loading={loading}
            hoverable
            style={{ width: 260 }}
            cover={image}
            onClick={handleChoose}
            title={title}
        >
            <Meta 
                title={metaTitle}
                description={collaborator.title}
            />
        </Card>
    );
}

export default CollaboratorCard;