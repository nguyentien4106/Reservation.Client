import React, { useEffect, useState } from "react";

import { Button, Grid, Menu, Space, theme } from "antd";

import { MenuOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import LogoutLink from "../../LogoutLink";
import DataService from '../../../lib/DataService';
import { getLocal, setLocal } from "../../../lib/helper";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "../../../state/loading/loadingSlice";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavLayout() {
    const { token } = useToken();
    const screens = useBreakpoint();
    // const [email, setEmail] = useState(getLocal("email"))

    const menuItems = [
        {
            key: "userRegisterService",
            label: "Đăng ký cho thuê",
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
            setEmail("")
        })
        .finally(() => {
            dispacth(hide())
        })
    }

    const [authView, setAuthView ] = useState("")

    const email = useSelector(state => state.auth.email)

    const renderAuth = () => {
        return email ? <LogoutLink email={email} handleLogout={handleLogout}/>
            : <Space>
                <Button type="text" style={{ backgroundColor: "white" }} onClick={() => navigate("/login")}>Log in</Button>
                <Button type="primary" onClick={() => navigate("/register")}>Sign up</Button>
            </Space>
    }


    useEffect(() => {
        setAuthView(renderAuth())
        console.log('emailchange')
    }, [email])

    return (
        <>
            <div style={styles.menuContainer}>
                <div className="demo-logo" onClick={() => navigate("/")}>
                    ThueNguoiYeu.Com
                </div>
                <Menu
                    style={styles.menu}
                    mode="horizontal"
                    items={menuItems}
                    onClick={onClick}
                    selectedKeys={screens.md ? [current] : ""}
                    overflowedIndicator={
                        <Button type="text" icon={<MenuOutlined />}></Button>
                    }
                />
            </div>
            {
                authView
            }
        </>
    );
}