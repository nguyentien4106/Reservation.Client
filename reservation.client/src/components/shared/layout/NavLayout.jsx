import React, { useState } from "react";

import { Button, Grid, Menu, Space, theme } from "antd";

import { MenuOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import LogoutLink from "../../LogoutLink";
import DataService from '../../../lib/DataService';
import { getLocal, setLocal } from "../../../lib/helper";
import { useDispatch } from "react-redux";
import { hide, show } from "../../../state/loading/loadingSlice";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavLayout({ isAuth }) {
    const { token } = useToken();
    const screens = useBreakpoint();
    console.log('screens', screens)
    const menuItems = [
        {
            key: "collaborator",
            label: "Cộng tác viên",
            children: [
                {
                    key: "overall",
                    label: "Tổng quan"
                },
                {
                    key: "customers",
                    label: "Khách hàng"
                },
                {
                    key: "setting",
                    label: "Cài đặt",
                    onClick: () => navigate("/collaborator-setting")
                }
            ]
        },
        {
            key: "donate",
            label: "Donate",
        }
    ];

    const [current, setCurrent] = useState("");
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const styles = {
        container: {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth: token.screenXL,
            padding: screens.md ? `0px ${token.paddingLG}px` : `0px ${token.padding}px`
        },
        header: {
            backgroundColor: token.colorBgContainer,
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
            position: "relative"
        },
        logo: {
            display: "block",
            height: token.sizeLG,
            left: "50%",
            position: screens.md ? "static" : "absolute",
            top: "50%",
            transform: screens.md ? " " : "translate(-50%, -50%)"
        },
        menu: {
            backgroundColor: "transparent",
            color: "white",
            borderBottom: "none",
            lineHeight: screens.sm ? "4rem" : "3.5rem",
            marginLeft: screens.md ? "0px" : `-${token.size}px`,
            width: screens.md ? "inherit" : token.sizeXXL
        },
        menuContainer: {
            alignItems: "center",
            display: "flex",
            gap: token.size,
            width: "100%"
        }
    };

    const navigate = useNavigate()

    const dispacth = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault();
        dispacth(show())
        DataService.post("Auth/Logout", {}).then(res => {
            console.log("lougout", res)
            setLocal("accessToken", "")
            setLocal("refreshToken", "")
            setLocal("email", "")
        })
        .finally(() => {
            dispacth(hide())
        })
    }

    const email = getLocal("email")
    
    const renderAuth = () => {
        return isAuth ? <LogoutLink email={email} handleLogout={handleLogout}/>
            : <Space>
                <Button type="text" style={{ backgroundColor: "white" }} onClick={() => navigate("/login")}>Log in</Button>
                <Button type="primary" onClick={() => navigate("/register")}>Sign up</Button>
            </Space>
    }

    return (
        <>
            <div style={styles.menuContainer}>
                <div className="demo-logo" onClick={() => {
                    navigate("/")
                    setCurrent("")
                }}>
                    ThueNguoiYeu.Com
                </div>
                <Menu
                    className="layout-menu"
                    style={styles.menu}
                    mode="horizontal"
                    items={menuItems}
                    theme="light"
                    onClick={onClick}
                    selectedKeys={screens.md ? [current] : ""}
                    overflowedIndicator={
                        <Button type="text" icon={<MenuOutlined />}></Button>
                    }
                />
            </div>
            {
                renderAuth()
            }
        </>
    );
}