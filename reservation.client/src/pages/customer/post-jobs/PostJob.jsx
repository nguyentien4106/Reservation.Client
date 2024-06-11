import React from "react";
import AuthorizeView from "@/components/auth/AuthorizeView";
import { ROLES } from "../../../constant/settings";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Space,
    Flex,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import locationAPI from "../../../api/locationAPI";
import useFetchServices from "../../../hooks/useFetchServices";
import DataService from "../../../lib/DataService";
import dayjs from "dayjs";
import { CUSTOMER_PATH } from "../../../constant/urls";
import { getUser } from "../../../lib/helper";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default function PostJob() {
    const provinces = locationAPI.getProvinces()
    const services = useFetchServices()
    const onFinish = (values) => {
        const userId = getUser().id
        const params = Object.assign(values, { 
            applicationUserId: userId, 
            services: values.services.map(item => ({ serviceId: item, applicationUserId: userId })),
            status: 0
        })
        DataService.post(CUSTOMER_PATH.createJob, params).then(res => {
            console.log(res)
        })
    };

    const prefixSelector = (
        <Form.Item name="paymentType" noStyle>
            <Select
                style={{
                    width: 100,
                }}
            >
                <Option value="1">Mỗi giờ</Option>
                <Option value="2">Toàn bộ</Option>
            </Select>
        </Form.Item>
    );

    return (
        <AuthorizeView role={ROLES.USER}>
            <div
                style={{
                    textAlign: "center"
                }}
            >
                <h2>Thôn tin job</h2>
            </div>

            <Flex
                justify="center"
                vertical={true}
                style={{
                    alignItems: "center",
                    width: "100%",
                    padding: 20
                }}
                align="center"
            >

                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        backgroundColor: "rgb(232, 232, 232)",
                        minWidth: "60%",
                        width: "60%",
                        padding: 30,
                        borderRadius: 20,
                    }}
                    initialValues={{
                        paymentType: "1",
                        dateTime: dayjs()
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        tooltip="Tiêu đề để giúp người dùng nhanh chóng nhận biết job"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Tỉnh/Thành phố"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Tỉnh/Thành phố"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            options={provinces}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Thông tin chi tiết"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Hoạt động gì? Cụ thể job?" />
                    </Form.Item>

                    <Form.Item
                        name="dateTime"
                        label="Thời gian"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>


                    <Form.Item
                        name="requried"
                        label="Yêu cầu ?"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={"cast"}
                        label="Chi phí bạn trả"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber addonBefore={prefixSelector} />
                    </Form.Item>

                    <Form.Item
                        name={"services"}
                        label="Dịch vụ muốn thuê?"
                        tooltip={"Chúng tôi sẽ gửi thông báo tới cho những người gần bạn và có dịch vụ bạn đang tìm."}
                    >
                        <Select
                            options={services}
                            mode="multiple"
                        >

                        </Select>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            // ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        {
                            <Button type="primary" htmlType="submit">
                                Đăng "job"
                            </Button>
                        }
                    </Form.Item>
                </Form>
            </Flex>
        </AuthorizeView>
    );
}
