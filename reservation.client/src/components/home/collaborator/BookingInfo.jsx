import React, { useContext, useState } from 'react'
import { ContainerInfoProfile } from '@/pages/home/collaborator/CollaboratorPage'
import { Flex, Typography } from 'antd'
import { showMoney } from '../../../lib/helper';

const { Text } = Typography;

const defaultPhone = "Hiển thị số điện thoại"
function BookingInfo() {
    const collaborator = useContext(ContainerInfoProfile)
    const [phoneInfo, setPhoneInfo] = useState(defaultPhone)

    const handleShowPhone = () => {
        setPhoneInfo(prev => prev === defaultPhone ? collaborator.phoneNumber : defaultPhone)
    }

    return (
        <Flex className='booking-info' vertical>
            <Text className='price-booking-info'>{showMoney(collaborator?.pricePerHour) + " /h"}</Text>
            <button className='button-booking' onClick={handleShowPhone}>{phoneInfo}</button>
        </Flex>
    )
}

export default BookingInfo
