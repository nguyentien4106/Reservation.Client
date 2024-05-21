import React from "react";
import MenuItems from "../../components/account/MenuItems";
import { Space, Typography } from "antd";
import AccountLayout from "../../components/account/AccountLayout";
import './index.css'
const { Text } = Typography

const getItem = ({ label, value }) => (
    <Space key={label} direction='vertical'>
        <Text className='text-header'>{label}</Text>
        <Text className='text-value'>{value}</Text>
    </Space>
)

export default function Account() {
    return (
        <h1>Account</h1>
    );
}
