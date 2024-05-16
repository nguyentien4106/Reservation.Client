import React, { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Switch,
    Tag,
} from "antd";
import { getLocal } from "../../lib/helper";
import { Select } from "antd";
import useFetchProvinces from "../../hooks/useFetchProvinces";
import useFetchDistricts from "../../hooks/useFetchDistricts";
import useFetchServices from "../../hooks/useFetchServices";
import dayjs from "dayjs";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: "${label} là bắt buộc!",
    types: {
        email: "${label} không phải một email!",
        number: "${label} không phải là một số!",
    },
};

const tagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Tag
            color={"green"}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginInlineEnd: 4,
            }}
        >
            {label}
        </Tag>
    );
};

export default function Profile({ onFinish, setProvince, initialValues }) {
    const email = getLocal("email");
    const [provinceId, setProvinceId] = useState(0);
    const provinces = useFetchProvinces();
    const districts = useFetchDistricts(provinceId);
    const services = useFetchServices();
    const [form] = Form.useForm();

    useEffect(() => {
        const serviceIds = initialValues?.collaboratorServices?.map(item => item.serviceId)
        const newValues = { 
            ...initialValues, 
            birthDate: dayjs(initialValues?.birthDate), 
            collaboratorServices: serviceIds, 
        }

        form.setFieldsValue(newValues)

    }, [initialValues])

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
                ...initialValues,
                email: email
            }}
            form={form}
        >
            <Form.Item
                name="isReady"
                label="Bật hồ sơ cho thuê ?"
                tooltip="Khi được kích hoạt, hồ sơ của bạn sẽ được public và khách hàng có thể liên hệ để thuê."
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>

            <Form.Item
                name={"nickName"}
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
                name="city"
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
                    placeholder="Tỉnh"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                    }
                    options={provinces}
                    onSelect={(e, province) => {
                        setProvinceId(province.id)
                    }}

                />
            </Form.Item>

            <Form.Item
                name="district"
                label="Quận/Huyện"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Huyện"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                    }
                    options={districts}

                />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
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
                name={"birthDate"}
                label="Ngày sinh"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name={"height"}
                label="Chiều cao"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber placeholder="cm" />
            </Form.Item>

            <Form.Item
                name={"weight"}
                label="Cân nặng"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <InputNumber placeholder="kg" />
            </Form.Item>

            <Form.Item
                name={"job"}
                label="Nghề nghiệp"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="sinh viên" />
            </Form.Item>

            <Form.Item
                name="pricePerHour"
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

            <Form.Item
                name="collaboratorServices"
                label="Dịch vụ cho thuê"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    tagRender={tagRender}
                    style={{
                        width: "100%",
                    }}
                    options={services}
                />
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
