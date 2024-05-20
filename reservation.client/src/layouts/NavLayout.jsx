import React, { useEffect, useState } from "react";
import { Button, Grid, Menu, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UserComponent from "./UserComponent";
import { Cookie } from "../lib/cookies";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../lib/helper";
import { menuItems } from "./helper";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function NavLayout() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate()
    const [current, setCurrent] = useState("");
    const user = getUser();
    

    // const menuItems = [
    //     {
    //         key: "collaborator",
    //         label: "Cộng tác viên",
    //         children: [
    //             {
    //                 key: "overall",
    //                 label: "Tổng quan",
    //                 onClick: () => navigate("/collaborator-overall")

    //             },
    //             {
    //                 key: "customer",
    //                 label: "Khách hàng đã thuê",
    //                 onClick: () => navigate("/collaborator-customer")
    //             },
    //             {
    //                 key: "setting",
    //                 label: "Hồ sơ cho thuê",
    //                 onClick: () => navigate("/collaborator-setting")
    //             }
    //         ]
    //     },
    //     {
    //         key: "donate",
    //         label: "Donate",
    //     },
    //     {
    //         key: "manage",
    //         label: "Quản lí collaborator",
    //         onClick: () => navigate("/manage-collaborator")
    //     }
    // ];

    useEffect(() => {
        console.log(user)
    }, [user])

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
            // color: "white",
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

    const renderAuth = () => {
        return user ? <UserComponent user={user}/>
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
                    style={styles.menu}
                    mode="horizontal"
                    items={menuItems(navigate, true)}
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