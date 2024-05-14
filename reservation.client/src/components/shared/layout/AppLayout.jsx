import React, { useState } from 'react';
import { Layout, theme, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import NavLayout from './NavLayout';

const { Header, Content } = Layout;

const AppLayout = ({ isAuth }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minWidth: "100%", height: "100vh" }}  >
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "space-around"
                    }}
                >
                    <NavLayout isAuth={isAuth}/>
                </Header>
                <Content
                    style={{
                        padding: '0 16px',
                    }}
                >
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 10,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </>


    );
};
export default AppLayout;