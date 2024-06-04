import React, { useEffect, useState } from "react";
import { generateMessages, getUser } from "../../../../lib/helper";
import { Form, Input, InputNumber, Button, App, Modal, Select } from "antd";
import { createRef } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../../lib/DataService";
import { CUSTOMER_PATH, HOME_PATH } from "../../../../constant/urls";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const OrderContent = ({ collaboratorEmail, collaboratorId, nickName, collaboratorServices }) => {
    const user = getUser();
    const submit = createRef(null);
    const { message } = App.useApp();
    const dispatch = useDispatch()
    const [price, setPrice] = useState(0)
    const [time, setTime] = useState(0)
    const [tips, setTips] = useState(0)

    if (!user) {
        return (
            <>
                <p>Hãy đăng nhập để tiếp tục</p>
                <Link to="/login">Đăng nhập</Link>
            </>
        );
    }

    const onFinish = (values) => {
        const params = Object.assign(values, {
            collaboratorEmail: collaboratorEmail,
            applicationUserId: user.id,
            collaboratorId: collaboratorId,
            nickName,
            price,
            amount: time * price + tips
        });
        console.log(params)
        dispatch(show())
        DataService.post(CUSTOMER_PATH.createOrder, params)
            .then((res) => {
                const { data } = res
                if(data.isSucceed){
                    message.success("Gửi yêu cầu thành công. Xin hãy kiểm tra email hoặc trang 'Thông Báo' để cập nhật")
                }
                else {
                    message.error(generateMessages(data.messages))
                }
            })
            .catch(err => {
                message.error(generateMessages(err))
            })
            .finally(() =>{
                dispatch(hide())
                Modal.destroyAll()
            });
    };

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 1000,
            }}
            initialValues={{
                email: user?.userName,
                price: price
            }}
        >
            <Form.Item
                name={"name"}
                label="Tên"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                tooltip="Số điện thoại để cho họ có thể liên lạc lại cho bạn."
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input maxLength={11} minLength={10} />
            </Form.Item>

            <Form.Item
                name="service"
                label="Dich vụ muốn thuê"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    style={{
                        width: "50%"
                    }}
                    options={collaboratorServices.map(item => ({ value: item.name, label: item.name }))}
                    onChange={e => {
                        const price = collaboratorServices.find(item => item.name === e)?.price ?? 0
                        setPrice(price)
                    }}
                >

                </Select>
            </Form.Item>

            <Form.Item
                name="tips"
                label="Tips"
                tooltip="Tiền tips ngoài tiền dịch vụ phải trả."
            >
                <InputNumber
                    style={{ width: "50%" }}
                    formatter={(value) =>
                        `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                    onChange={setTips}
                />
            </Form.Item>
            <Form.Item
                label="Giá dịch vụ"
            >
                <InputNumber
                    value={price}
                    disabled
                    style={{ width: "50%" }}
                    formatter={(value) =>
                        `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                />
            </Form.Item>

            <Form.Item
                name="times"
                label="Thời gian"
                rules={[
                    {
                        required: true,
                    },
                ]}
                style={{ width: "100%" }}

            >
                <InputNumber min={1} 
                    onChange={setTime}
                />
            </Form.Item>

            <Form.Item
                label="Tổng tiền"
                style={{ width: "100%" }}
                tooltip="Giá dịch vụ * thời gian + Tips"

            >
                <InputNumber
                    disabled
                    value={time * price + tips}
                    style={{ width: "50%" }}
                    
                    formatter={(value) =>
                        ` đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                />
            </Form.Item>

            <Form.Item
                name="description"
                label="Đề nghị thêm ?"
                tooltip="Bạn muốn đề xuất thêm dịch vào nào đó, hãy mô tả ở đây để họ biết."
            >
                <Input />
            </Form.Item>
            <Form.Item name="zalo" label="Zalo">
                <Input />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                {
                    <Button type="primary" htmlType="submit" ref={submit}>
                        Gửi yêu cầu
                    </Button>
                }
            </Form.Item>
        </Form>
    );
};
export default OrderContent;
