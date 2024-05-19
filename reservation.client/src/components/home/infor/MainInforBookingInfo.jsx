import React, { useContext, useEffect, useState } from 'react'
import { CollaboratorInforProfile } from '../CollaboratorInfor'
import { Space, Tag, Flex, Divider, Typography, Image } from 'antd'
import { R2 } from '../../../lib/R2'
import { getUserName } from '../../../lib/helper'
const { Text } = Typography

function MainInforBookingInfo() {
    const collaborator = useContext(CollaboratorInforProfile)
    const [images, setImages] = useState([])

    useEffect(() => {
        if(collaborator){
            const userName = getUserName(collaborator.email)

            R2.get(userName).then(res => {
                setImages(res.map(item => item.url))
            })
        }
    }, [collaborator])

    return (
        <>
            <h1>Thông tin</h1>
            <Text>{collaborator?.title}</Text>
            <Flex>
            {
                images && images.map(image => <Image src={image} height={300}/>)
            }
            </Flex>
        </>
    )
}

export default MainInforBookingInfo
