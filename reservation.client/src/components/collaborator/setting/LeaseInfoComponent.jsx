import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Switch,
    Tag,
    message,
} from "antd";
import { Select } from "antd";
import useFetchProvinces from "../../../hooks/useFetchProvinces";
import useFetchDistricts from "../../../hooks/useFetchDistricts";
import useFetchServices from "../../../hooks/useFetchServices";
import dayjs from "dayjs";
import { ProfileContext } from "../../../context/useProfileContext";
import AvatarComponent from "./AvatarComponent";
import { COLLABORATOR_PATH } from "../../../constant/urls";
import DataService from "../../../lib/DataService";

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


export default function LeaseInfoComponent({ user, collaboratorId, initialValues }) {
    const [provinceId, setProvinceId] = useState(0);
    const [hasAvatar, setHasAvatar] = useState(false)
    const provinces = useFetchProvinces();
    const districts = useFetchDistricts(provinceId);
    const services = useFetchServices();
    const [form] = Form.useForm();
    const profile = useContext(ProfileContext)

    useEffect(() => {
        const serviceIds = initialValues?.collaboratorServices?.map(
            (item) => item.serviceId
        );

        const newValues = {
            ...initialValues,
            birthDate: dayjs(initialValues?.birthDate),
            collaboratorServices: serviceIds,
        };

        form.setFieldsValue(newValues);
    }, [initialValues]);

    
    const onFinish = (values) => {
        if(!hasAvatar){
            message.error("Bạn cần phải upload ảnh đại diện trước.")
            return
        }
        const services =
            values.collaboratorServices &&
            values.collaboratorServices.map((item) => ({
                serviceId: item,
                collaboratorId: collaboratorId,
            }));

        const params = {
            ...values,
            applicationUserId: user?.id,
            collaboratorServices: services,
            city: values.city,
            id: collaboratorId
        };

        console.log(params)

        const url = collaboratorId && collaboratorId != "00000000-0000-0000-0000-000000000000"
            ? COLLABORATOR_PATH.update
            : COLLABORATOR_PATH.add;

            DataService.post(url, params).then((res) => {
            const { data } = res;
            console.log(data)
            message.open({
                type: data.isSucceed ? "success" : "error",
                content: data.isSucceed
                    ? "Cập nhập hồ sơ cho thuê thành công !"
                    : generateMessages(data.messages),
                duration: 5,
            });
        });
    };

    return (
        <>
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
                    email: profile?.collaborator?.email,
                }}
                form={form}
            >
                <Form.Item
                    name="isReady"
                    label="Bật hồ sơ cho thuê ?"
                    tooltip="Khi được kích hoạt, hồ sơ của bạn sẽ được public và khách hàng có thể liên hệ để thuê."
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    tooltip="Ảnh này sẽ được dùng làm avatar hiển thị cho người muốn thuê thấy. Vậy nên hãy dùng ảnh đẹp nhất của mình nhé."
                    label="Avatar"
                    style={{
                        marginBottom: 20,
                        textAlign: "center"
                    }}
                >
                    <AvatarComponent setHasAvatar={setHasAvatar}/>
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
                            setProvinceId(province.id);
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
                    name="sex"
                    label="Giới tính"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Nữ",
                                value: "Female",
                            },
                            {
                                label: "Nam",
                                value: "Male",
                            },
                            {
                                label: "Khác",
                                value: "Others",
                            },
                        ]}
                    />
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
                    name="otherServices"
                    label="Các dịch vụ khác"
                >
                    <Input />
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
                    {
                        profile?.allowUpdate && <Button type="primary" htmlType="submit">
                            Cập nhật hồ sơ
                        </Button>
                    }
                </Form.Item>
            </Form>
        </>
    );
}
