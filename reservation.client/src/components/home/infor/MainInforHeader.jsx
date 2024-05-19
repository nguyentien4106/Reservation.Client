import React, { useContext } from 'react'
import { CollaboratorInforProfile } from '../CollaboratorInfor'
import { Space, Tag, Flex, Divider, Typography } from 'antd'
import { getAge, getYear } from '../../../lib/helper'
import MainInforBookingInfo from './MainInforBookingInfo'
const { Text } = Typography

const getItem = ({ label, value }) => (
    <Space direction='vertical' style={{ flexGrow: 1, width: "33%" }}>
        <Text className='text-header'>{label}</Text>
        <Text className='text-value'>{value}</Text>
    </Space>
)

const items = collaborator => [
    {
        label: "Năm Sinh",
        value: getYear(collaborator?.birthDate)
    },
    {
        label: "Tỉnh/Thành Phố",
        value: collaborator?.city
    },
    {
        label: "Quận/Huyện",
        value: collaborator?.district
    },
    {
        label: "Nghề Nghiệp",
        value: collaborator?.job
    },
    {
        label: "Chiều Cao",
        value: collaborator?.height
    },
    {
        label: "Cân nặng",
        value: collaborator?.weight
    },

]
function MainInforHeader() {
    const collaborator = useContext(CollaboratorInforProfile)

    const servicePanel = service => (
        <div className='service-panel text-header'>
            <Text style={{ color: "white" }}>{service}</Text>
        </div>
    )
    return (
        <>
            <Flex gap="middle" vertical={false} justify='space-between'>
                <h2>{collaborator?.nickName}</h2>
                <div>
                    {
                        getItem("Năm sinh",)
                    }
                </div>
            </Flex>
            <Divider />
            <Flex gap="middle" wrap={true}>
                {
                    items(collaborator).map(item => getItem(item))
                }
            </Flex>

            <Divider />
            <Space direction='vertical'>
                <Text className='text-header'>Các dịch vụ</Text>
                <Flex gap="middle" wrap={true}>
                    {
                        collaborator?.collaboratorServices?.map(item => servicePanel(item.name))
                    }
                </Flex>
            </Space>
            <Divider />
            <MainInforBookingInfo />
        </>
    )
}

export default MainInforHeader
