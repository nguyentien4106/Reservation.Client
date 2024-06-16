import React, { useContext, useState } from "react";
import { Layout, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "./Header";
import "./index.css"
const { Header, Content } = Layout;

const AppLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout style={{ minWidth: "100%", height: "100vh" }}>
                <AppHeader />
                <Content
                    style={{
                        padding: "0 16px",
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
                        <Outlet />
                    </div>
                </Content>

                {/* <Footer style={{ textAlign: "center" }}>
                    ThueNguoiYeu.me ©{new Date().getFullYear()}
                </Footer> */}
            </Layout>
        </>
    );
};
export default AppLayout;
