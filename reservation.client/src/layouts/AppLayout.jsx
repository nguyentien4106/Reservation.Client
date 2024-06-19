import React, { useContext, useState } from "react";
import { Layout, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./Header";
import "./index.css"
import { Footer } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";
const { Header, Content } = Layout;

const AppLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minWidth: "100%", height: "100vh", overflowY: "hidden" }}>
                <AppHeader />
                <Content
                    style={{
                        padding: "0 16px",
                        overflowY: "auto"
                    }}
                >
                    <div
                        style={{
                            background: colorBgContainer,
                            minHeight: 280,
                            padding: 10,
                            borderRadius: borderRadiusLG,
                            height: "fit-content",
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
                
            </Layout>
            
        </>
    );
};
export default AppLayout;
