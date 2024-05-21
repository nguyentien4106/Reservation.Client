import React, { useState } from "react";
import { Button, Grid, Menu, Space, theme } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { getUser } from "../lib/helper";
import { useNavigate } from "react-router-dom";
import { getStyles, menuItems } from "./helper";
import UserComponent from "./UserComponent";
const { useToken } = theme;
const { useBreakpoint } = Grid;

export default function Header() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const navigate = useNavigate()
    const [current, setCurrent] = useState("");
    const styles = getStyles(screens, token)

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const renderAuth = () => {
        const user = getUser();
        return user ? (
            <UserComponent user={user} />
        ) : (
            <Space>
                <Button
                    type="text"
                    style={{ backgroundColor: "rgb(169 169 181)" }}
                    onClick={() => navigate("/login")}
                >
                    Log in
                </Button>
                <Button type="primary" onClick={() => navigate("/register")}>
                    Sign up
                </Button>
            </Space>
        );
    };


    return (
        <nav style={styles.header}>
            <div style={styles.container}>
                <div style={styles.menuContainer}>
                    <div
                        className="demo-logo"
                        onClick={() => {
                            navigate("/");
                            setCurrent("");
                        }}
                    >
                        ThueNguoiYeu.vn
                    </div>
                    <Menu
                        style={styles.menu}
                        mode="horizontal"
                        items={menuItems(navigate)}
                        onClick={onClick}
                        selectedKeys={screens.md ? [current] : ""}
                        overflowedIndicator={
                            <Button
                                type="text"
                                icon={<MenuOutlined />}
                            ></Button>
                        }
                    />
                    {renderAuth()}
                </div>
            </div>
        </nav>
    );
}
