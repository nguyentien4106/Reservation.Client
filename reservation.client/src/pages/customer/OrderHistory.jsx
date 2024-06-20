import React, { useEffect, useState } from 'react'
import DataService from '../../lib/DataService'
import { ORDER_PATH } from '../../constant/urls'
import { App, Flex } from 'antd'
import { getUser } from '../../lib/helper'
import "./orderHistory.css"
import { Link } from 'react-router-dom'
import CustomerOrders from '../../components/customer/orderHistory/CustomerOrders'
import AuthorizeView from '../../components/auth/AuthorizeView'
import { ROLES } from '../../constant/settings'
import { ACCOUNT_ROUTE_PATH, COLLABORATORS_ROUTE_PATH } from '../../constant/paths'

function OrderHistory() {
    const [customerOrders, setCustomers] = useState([])
    const { message } = App.useApp()

    useEffect(() => {
        const user = getUser()
        if(user){
            DataService.get(ORDER_PATH.getCustomerOrders + user?.id).then(res => {
                const { data } = res
                if (data.isSucceed) {
                    setCustomers(data.data)
                }
                else {
                    message.error("Tải dữ liệu thất bại. Xin thử lại sau.")
                }
            }).catch(console.error)
        }
        
    }, [])

    return (
        <AuthorizeView role={ROLES.USER}>
            <Flex justify='space-between' className='order-history-header'>
                <h2>Lịch sử thuê</h2>
                <Link to={COLLABORATORS_ROUTE_PATH.collaborators}><h2>Tìm Talents</h2></Link>
            </Flex>
            <CustomerOrders src={customerOrders} />
        </AuthorizeView>
    )
}

export default OrderHistory
