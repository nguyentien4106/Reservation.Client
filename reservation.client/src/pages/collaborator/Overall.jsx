import React, { useContext, useEffect, useState } from "react";
import AuthorizeView from "../../components/auth/AuthorizeView";
import { GUID, ROLES } from "../../constant/settings";
import { Col, Row, Space, Statistic, Tooltip } from "antd";
import DataService from "../../lib/DataService";
import { COLLABORATOR_PATH } from "../../constant/urls";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import {
    CheckOutlined,
    CloseOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ACCOUNT_ROUTE_PATH } from "../../constant/paths";
const AcceptStatus = 2;

export default function Overall() {
    const { user } = useSelector(store => store.user);
    const [orders, setOrders] = useState([]);
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(show());
        DataService.get(COLLABORATOR_PATH.getProfile + user?.collaboratorId)
            .then((res) => {
                const { orders } = res.data.data;
                console.log(orders)
                setReady(res.data.data.isReady);
                setOrders(orders);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(hide());
            });
    }, []);
    const getOrderAmount = (prev, cur) => prev + cur.price * cur.times + cur.tips;
    const totalMoney = orders.filter(item => item.status === AcceptStatus).reduce(getOrderAmount, 0);
    const reviews = orders
        ?.filter((order) => order.review !== null)
        .map((item) => item.review);

    const avgRate = reviews.length
        ? (
              reviews.reduce((prev, cur) => prev + cur.rate, 0) / reviews.length
          ).toFixed(2)
        : 0;
    return (
        <AuthorizeView role={ROLES.USER}>
            <h1>Tổng quan</h1>
            <Row>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Tổng số đơn thuê"
                        valueRender={() => {
                            return orders?.length &&
                                user?.collaboratorId &&
                                user?.collaboratorId !== GUID ? (
                                <Link to={ACCOUNT_ROUTE_PATH.collaboratorCustomer}>
                                    {orders?.length}
                                </Link>
                            ) : (
                                0
                            );
                        }}
                    />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Tổng số đơn đã nhận"
                        value={
                            orders?.filter((item) => item.status === 2).length
                        }
                    />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Tổng số đơn đã từ chối"
                        value={
                            orders?.filter((item) => item.status === 1).length
                        }
                    />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Tổng số đơn còn đang chờ"
                        value={
                            orders?.filter((item) => item.status === 0).length
                        }
                    />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Hồ sơ đang bật cho thuê ?"
                        valueRender={() => {
                            return ready ? (
                                <CheckOutlined
                                    style={{
                                        fontSize: 50,
                                        color: "green",
                                    }}
                                />
                            ) : (
                                <CloseOutlined
                                    style={{
                                        fontSize: 50,
                                        color: "red",
                                    }}
                                />
                            );
                        }}
                        precision={2}
                    />
                </Col>
            </Row>
            <Row gutter={24}>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Tổng số tiền kiếm được"
                        value={totalMoney}
                        prefix="đ"
                    />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic title="Tổng số review" value={reviews.length} />
                </Col>
                <Col
                    xs={{
                        flex: "100%",
                    }}
                    sm={{
                        flex: "50%",
                    }}
                    md={{
                        flex: "40%",
                    }}
                    lg={{
                        flex: "20%",
                    }}
                    xl={{
                        flex: "10%",
                    }}
                >
                    <Statistic
                        title="Rate trung bình"
                        valueRender={() => {
                            return (
                                <Tooltip title="Điểm đánh giá thấp sẽ làm hệ thống đề xuất bạn ít đi. Vậy hãy cố gắng đạt rate cao nhất có thể nhé!">
                                    <Space>
                                        {avgRate}
                                        <QuestionCircleOutlined />
                                    </Space>
                                </Tooltip>
                            );
                        }}
                    />
                </Col>
            </Row>
        </AuthorizeView>
    );
}
