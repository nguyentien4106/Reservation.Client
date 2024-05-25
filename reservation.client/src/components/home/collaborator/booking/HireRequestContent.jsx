import React, { useState } from "react";
import { generateMessages, getUser } from "../../../../lib/helper";

import { Form, Input, InputNumber, Button, App } from "antd";
import { createRef } from "react";
import { Link } from "react-router-dom";
import DataService from "../../../../lib/DataService";
import { HOME_PATH } from "../../../../constant/urls";
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

const HireRequestContent = ({ defaultPrice, collaboratorEmail, collaboratorId }) => {
    const user = getUser();
    const submit = createRef(null);
    const { message } = App.useApp();
    const dispatch = useDispatch()

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
            collaboratorId: collaboratorId
        });

        dispatch(show())
        DataService.post(HOME_PATH.sendHireRequest, params)
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
                offer: defaultPrice,
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
                name="offer"
                label="Offer"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber
                    width={"100%"}
                    style={{ width: "100%" }}
                    formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
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
            >
                <InputNumber min={1} />
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
export default HireRequestContent;
