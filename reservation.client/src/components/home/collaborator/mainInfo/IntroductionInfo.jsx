import React, { useContext, useEffect, useState } from 'react'
import { ContainerInfoProfile } from '../../../../pages/home/collaborator/CollaboratorPage'
import { Flex, Divider, Typography, Image } from 'antd'
import { R2 } from '../../../../lib/R2'
import { getUserName } from '../../../../lib/helper'
const { Text, Title } = Typography

function IntroductionInfo() {
    const collaborator = useContext(ContainerInfoProfile)
    const [introductions, setIntroductions] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        if (collaborator) {
            const userName = getUserName(collaborator.email)

            R2.get(userName).then(res => {
                setImages(res.map(item => item.url))
            })

            setIntroductions(collaborator?.introduction?.split("\n"))
        }
    }, [collaborator])

    return (
        <>
            <Title className='text-center'>Thông tin</Title>
            <Text>{collaborator?.title}</Text>
            <Divider />
            <Flex gap={20} wrap>
                {
                    images && images.map(image => <Image key={image} src={image} width={140}/>)
                }
            </Flex>
            <Divider />
            <Flex gap={5} vertical={true}>
                {
                    introductions && introductions.map((introduction, index) => <Text key={index}>{introduction}</Text>)
                }
            </Flex>
        </>
    )
}

export default IntroductionInfo
