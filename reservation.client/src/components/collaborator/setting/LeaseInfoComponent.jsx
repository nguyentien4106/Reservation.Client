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
    Space
} from "antd";
import { Select } from "antd";
import useFetchServices from "../../../hooks/useFetchServices";
import dayjs from "dayjs";
import AvatarComponent from "./AvatarComponent";
import { COLLABORATOR_PATH } from "../../../constant/urls";
import DataService from "../../../lib/DataService";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import locationAPI from "../../../api/locationAPI";
import { useDispatch, useSelector } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";
import { setUser } from "../../../state/user/userSlice";
import { getLocal } from "../../../lib/helper";
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

export default function LeaseInfoComponent({ initialValues }) {
    const [provinceId, setProvinceId] = useState(0);
    const [hasAvatar, setHasAvatar] = useState(false)
    const provinces = locationAPI.getProvinces();
    const districts = locationAPI.getDistrcits(provinceId);
    const services = useFetchServices();
    const [form] = Form.useForm();
    const { user } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const collaboratorId = getLocal("collaboratorId")

    useEffect(() => {
        const newValues = {
            ...initialValues,
            birthDate: dayjs(initialValues?.birthDate),
        };

        form.setFieldsValue(newValues);
    }, [initialValues]);


    const onFinish = (values) => {
        if (!hasAvatar) {
            message.error("Bạn cần phải upload ảnh đại diện trước.")
            return
        }

        const services =
            values.collaboratorServices &&
            values.collaboratorServices.map((item) => ({
                serviceId: item.serviceId,
                collaboratorId: collaboratorId,
                price: item.price
            }));
        console.log(services)
        if(!services || !services.length){
            message.error("Bạn cần chọn ít nhất một dịch vụ cho thuê.")
            return
        }

        const params = {
            ...values,
            applicationUserId: user?.id,
            collaboratorServices: services,
            city: values.city,
            id: collaboratorId
        };

        const url = collaboratorId && collaboratorId != "00000000-0000-0000-0000-000000000000"
            ? COLLABORATOR_PATH.update
            : COLLABORATOR_PATH.add;

        dispatch(show())
        DataService.post(url, params).then((res) => {
            const { data } = res;
            if(url === COLLABORATOR_PATH.add){
                localStorage.setItem("collaboratorId", data.data)
                dispatch(setUser({ collaboratorId: data.data }))
            }
            message.open({
                type: data.isSucceed ? "success" : "error",
                content: data.isSucceed
                    ? "Cập nhập hồ sơ cho thuê thành công !"
                    : generateMessages(data.messages),
                duration: 5,
            });
        }).catch((e) => {
            message.error("Đã có lỗi xảy ra xin kiểm tra lại.")
        }).finally(() => {
            dispatch(hide())
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
                    padding: 10
                }}
                validateMessages={validateMessages}
                initialValues={{
                    ...initialValues,
                    email: user?.userName,
                }}
                form={form}
            >
                <Form.Item
                    name="isReady"
                    label="Bật hồ sơ cho thuê ?"
                    tooltip="Hồ sơ của bạn sẽ được public tuy nhiên nếu ko bật Ready người dùng sẽ không thể thuê bạn."
                    valuePropName="checked"
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
                    <AvatarComponent setHasAvatar={setHasAvatar} />
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
                    <Input maxLength={25}/>
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
                    label="Dịch vụ cho thuê"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Form.List name={"collaboratorServices"}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'serviceId']}
                                            style={{
                                                width: "50%",
                                                minWidth: 200
                                            }}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Select
                                                options={services}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng điền giá',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                min={10000}
                                                width={"100%"}
                                                style={{ width: "100%" }}
                                                formatter={(value) =>
                                                    `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                                }
                                                parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                                            />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm dịch vụ
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    tooltip="Giá sẽ tự liên hệ và trao đổi giữa các bạn."
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
                        <Button type="primary" htmlType="submit">
                            Cập nhật hồ sơ
                        </Button>
                    }
                </Form.Item>
            </Form>
        </>
    );
}
