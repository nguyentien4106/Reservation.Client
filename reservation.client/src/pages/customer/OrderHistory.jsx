import React, { Suspense, lazy, useEffect, useState } from 'react'
import DataService from '../../lib/DataService'
import { CUSTOMER_PATH } from '../../constant/urls'
import { App, Flex, Typography } from 'antd'
import { getUser } from '../../lib/helper'
import "./orderHistory.css"
import Loading from "@/components/common/Loading"
import { Link } from 'react-router-dom'
import CustomerOrders from '../../components/customer/orderHistory/CustomerOrders'

function OrderHistory() {
    const [customerOrders, setCustomers] = useState([])
    const { message } = App.useApp()

    useEffect(() => {
        DataService.get(CUSTOMER_PATH.getOrders + getUser().id).then(res => {
            const { data } = res
            if (data.isSucceed) {
                setCustomers(data.data)
            }
            else {
                message.error("Tải dữ liệu thất bại. Xin thử lại sau.")
            }
        }).catch(console.error)
    }, [])

    return (
        <>
            <Flex justify='space-between'>
                <h1>Lịch sử thuê</h1>
                <Link to="/" ><h2>Tìm người để thuê</h2></Link>
            </Flex>
            <CustomerOrders src={customerOrders} />
        </>

    )
}

export default OrderHistory
