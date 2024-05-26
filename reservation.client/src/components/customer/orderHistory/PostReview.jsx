import React, { useState } from "react";
import { generateMessages, getUser } from "@/lib/helper";
import { Form, Input, InputNumber, Button, App, Modal } from "antd";
import { createRef } from "react";
import { Link } from "react-router-dom";
import DataService from "@/lib/DataService";
import { HOME_PATH } from "@/constant/urls";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import RateComponent from "./RateComponent";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

function PostReview() {
    const [rate, setRate] = useState(3)

    const onFinish = values => {
        console.log(values)
    }

    return (
        <>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                }}
            >
                <Form.Item
                    name={"name"}
                    label={""}
                    style={{
                        textAlign: "center"
                    }}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <RateComponent setRate={setRate} rate={rate}/>
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
                        <Button type="primary" htmlType="submit" >
                            Đăng Review
                        </Button>
                    }
                </Form.Item>
            </Form>
        </>
    )
}

export default PostReview
