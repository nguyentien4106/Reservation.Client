import React, { useState } from 'react';
import { Layout, theme, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import NavLayout from './NavLayout';
import { useSelector } from 'react-redux';

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const isAuth = useSelector(state => state.auth.isAuth)
    console.log(isAuth)

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
                        padding: '0 48px',
                    }}
                >
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 24,
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