import React from 'react'
import MenuItems from './MenuItems'
import { Flex } from 'antd'
import { Outlet } from 'react-router-dom'

function AccountLayout() {
    return (
       <Flex gap={"middle"}>
            <MenuItems />
            <Outlet />
       </Flex>
    )
}

export default AccountLayout
