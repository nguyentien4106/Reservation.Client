import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

export function AppLayout({ children }) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <div className="demo-logo">
                    <Link to="/home"> 
                        <Button>Home</Button>
                    </Link>
                </div>
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                /> */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <Link to="/register">
                        <Button>Register</Button>
                    </Link>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                        textAlign: 'center'
                    }}
                >
                {
                    children
                }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default AppLayout;