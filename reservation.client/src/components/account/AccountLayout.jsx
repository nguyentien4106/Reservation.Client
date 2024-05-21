import React, { useState } from "react";

import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { SettingOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const AccountLayout = () => {
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate()

    const items = [
        {
            key: 'account-setting',
            label: 'Cài đặt',
            icon: <SettingOutlined />,
            children: [
                {
                    key: 'info',
                    label: 'Thông tin tài khoản',
                    onClick: () => navigate("/account")
                },
                {
                    key: 'password',
                    label: 'Mật khẩu',
                    onClick: () => navigate("/account/change-password")
                },
            ],
        }
    ];

    return (
        <Layout
            style={{
                height: "100vh",
                backgroundColor: "white"
            }}
            className="account-layout"
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu theme="light" defaultSelectedKeys={['info']} mode="inline" items={items}  />
            </Sider>
            <Layout>
                {/* <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                /> */}
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default AccountLayout;
