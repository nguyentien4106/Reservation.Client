import React, { useEffect, useState } from 'react'
import CustomerOrders from '../../components/customer/orderHistory/CustomerOrders'
import DataService from '../../lib/DataService'
import { CUSTOMER_PATH } from '../../constant/urls'
import { App } from 'antd'
import { getUser } from '../../lib/helper'
import "./orderHistory.css"

function OrderHistory() {
    const [customerOrders, setCustomers] = useState([])
    const { message } = App.useApp()

    useEffect(() => {
        DataService.get(CUSTOMER_PATH.getOrders + getUser().id).then(res => {
            const { data } = res
            if(data.isSucceed){
                setCustomers(data.data)
            }
            else{
                message.error("Tải dữ liệu thất bại. Xin thử lại sau.")
            }
        }).catch(console.error)
    }, [])
    
    return (
        <>
            <h1>Order history 1</h1>
            <CustomerOrders src={customerOrders} />
        </>

    )
}

export default OrderHistory
