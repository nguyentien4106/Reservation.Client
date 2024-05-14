import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, DatePicker, Switch } from "antd";
import { getLocal } from "../../lib/helper";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: "${label} phải nhập!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
};

export default function Profile({ onFinish, turnedOnProfile }) {
    const email = getLocal("email");

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            validateMessages={validateMessages}
            initialValues={{
                email: email,
            }}
        >
            <Form.Item
                name="switch"
                label="Bật hồ sơ cho thuê ?"
                tooltip="Khi được kích hoạt, hồ sơ của bạn sẽ được public và khách hàng có thể liên hệ để thuê."
                valuePropName="checked"
            >
                <Switch onChange={turnedOnProfile} />
            </Form.Item>
            <Form.Item
                name={"nickname"}
                label="Nick Name"
                tooltip="Tên hiển thị trên hồ sơ"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type: "email",
                    },
                ]}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
                name="title"
                label="Tự bạch"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input min={10} />
            </Form.Item>
            <Form.Item
                name="phonenumber"
                label="Phone Number"
                tooltip="Vui lòng nhập số điện thoại chính chủ để chúng tôi có thể kiểm chứng thông tin."
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input maxLength={11} minLength={10} />
            </Form.Item>
            <Form.Item
                name={"birthdate"}
                label="Birthdate"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="priceperhour"
                label="Chi phí mỗi giờ thuê"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber
                    min={10000}
                    width={"100%"}
                    style={{ width: "100%" }}
                    formatter={(value) =>
                        `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\VND\s?|(,*)/g, "")}
                />
            </Form.Item>

            <Form.Item name={"introduction"} label="Phần mô tả giới thiệu">
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Cập nhật hồ sơ
                </Button>
            </Form.Item>
        </Form>
    );
}
