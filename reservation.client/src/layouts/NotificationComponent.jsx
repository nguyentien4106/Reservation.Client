import { Avatar, Badge, Button, Flex, List, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import bell from "@/assets/bell.png";
import DataService from "../lib/DataService";
import { getQueryString, getUser } from "../lib/helper";
import { defaultPaging } from "@/constant/options";
import { NOTIFICATION_TYPE, ORDERS_STATUS } from "../constant/settings";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_ROUTE_PATH } from "../constant/paths";

export default function NotificationComponent() {
    const [notifications, setNotifications] = useState([]);
    const [total, setTotal] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const user = getUser();
    const notificationRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [notificationRef]);

    useEffect(() => {
        getNotifications();
    }, []);

    const getNotifications = () => {
        DataService.get(
            `Notifications/Users/${user.id}` + getQueryString(defaultPaging)
        ).then((res) => {
            setNotifications(res.data.data);
            setTotal(res.data.total);
        });
    };

    const showNotification = () => {
        setOpen(true);
        getNotifications();
    };

    const loadMore =
        total > notifications?.length ? <Button>Xem Thêm</Button> : <></>;

    const readNotification = (noti, route) => {
        setOpen(false);
        if (!noti.read) {
            DataService.get(`Notifications/${noti.id}`)
                .then((res) => {
                    if (res) {
                        setNotifications((prev) =>
                            prev.map((item) =>
                                item.id === noti.id
                                    ? Object.assign(item, { read: true })
                                    : item
                            )
                        );
                    }
                })
                .finally(() => {
                    navigate(route);
                });
        } else {
            navigate(route);
        }
    };

    const renderNotification = (item) => {
        let data;
        switch (item.type) {
            case NOTIFICATION_TYPE.NewOrder:
                data = item.content ? JSON.parse(item.content) : {};
                return (
                    <div
                        onClick={() =>
                            readNotification(
                                item,
                                ACCOUNT_ROUTE_PATH.collaboratorCustomer
                            )
                        }
                    >{`Yêu cầu cho thuê từ ${
                        data?.UserName ?? "người dùng"
                    }`}</div>
                );
            case NOTIFICATION_TYPE.NewReview:
                data = item.content ? JSON.parse(item.content) : {};
                return (
                    <div
                        onClick={() =>
                            readNotification(
                                item,
                                "/Collaborators/" + user.collaboratorId
                            )
                        }
                    >
                        {`Bạn nhận được review `} 
                        {<strong><u><i style={{ color: "green" }}>{data?.Rate}</i></u></strong>}{" sao mới."}
                    </div>
                );

            case NOTIFICATION_TYPE.NewEmployee:
                data = item.content ? JSON.parse(item.content) : {};
                return (
                    <div
                        onClick={() =>
                            readNotification(
                                item,
                                ACCOUNT_ROUTE_PATH.collaboratorCustomer
                            )
                        }
                    >{`Yêu cầu cho thuê từ ${
                        data?.UserName ?? "người dùng"
                    }`}</div>
                );

            case NOTIFICATION_TYPE.NewStatusOrder:
                data = item.content ? JSON.parse(item.content) : {};
                return (
                    <div
                        onClick={() =>
                            readNotification(
                                item,
                                ACCOUNT_ROUTE_PATH.customerOrders
                            )
                        }
                    >
                        {`Yêu cầu cho thuê với `}
                        {<i><u>{data.Collaborator}</u></i>}{" "}
                        {data.Status === ORDERS_STATUS.Approved ? (
                            <strong style={{ color: "green" }}>
                                đã được đồng ý. Bạn có thể post Review
                            </strong>
                        ) : (
                            <strong style={{ color: "red" }}>
                                đã bị từ chối
                            </strong>
                        )}{" "}
                    </div>
                );
        }
    };

    return (
        <div
            style={{
                position: "relative",
            }}
            ref={notificationRef}
        >
            <Badge
                count={notifications?.filter((item) => !item.read).length}
                overflowCount={10}
                className="pointer"
                onClick={showNotification}
            >
                <Avatar
                    size="large"
                    style={{
                        backgroundColor: "white",
                    }}
                    icon={<img src={bell} height={"40%"} />}
                />
            </Badge>
            <div className="pointer notifications">
                {open && (
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <List
                            header={
                                <Flex>
                                    <h4>Thông Báo</h4>
                                    <Button
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            zIndex: 3,
                                        }}
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </Button>
                                </Flex>
                            }
                            bordered
                            dataSource={notifications}
                            renderItem={(item) => (
                                <List.Item
                                    className={`${
                                        item.read ? "read" : "not-read"
                                    }`}
                                >
                                    {renderNotification(item)}
                                </List.Item>
                            )}
                            loadMore={loadMore}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
