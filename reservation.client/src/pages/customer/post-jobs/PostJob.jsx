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

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default function PostJob() {
    const onFinish = (values) => {};

    return (
        <AuthorizeView role={ROLES.USER}>
            <div style={{
                // textAlign: "center"
            }}>
                <Flex
                    style={{
                        // maxWidth: "60%",
                        alignItems: "center"
                    }}
                    justify="center"
                    vertical
                >
                    <h3>Tạo bài viết tìm người</h3>

                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{
                            // maxWidth: 600,
                            minWidth: "60%"
                        }}
                        // validateMessages={validateMessages}
                        // initialValues={{
                        //     ...initialValues,
                        //     email: user?.userName,
                        // }}
                        // form={form}
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
                            name="city"
                            label="Tỉnh/Thành phố"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {/* <Select
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
                    /> */}
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
                            {/* <Select
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
                    /> */}
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
                                        {fields.map(
                                            ({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{
                                                        display: "flex",
                                                        marginBottom: 8,
                                                    }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[
                                                            name,
                                                            "serviceId",
                                                        ]}
                                                        style={{
                                                            width: "50%",
                                                            minWidth: 200,
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
                                                        name={[name, "price"]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Vui lòng điền giá",
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            min={10000}
                                                            width={"100%"}
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            formatter={(
                                                                value
                                                            ) =>
                                                                `đ ${value}`.replace(
                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                    ","
                                                                )
                                                            }
                                                            parser={(value) =>
                                                                value.replace(
                                                                    /\đ\s?|(,*)/g,
                                                                    ""
                                                                )
                                                            }
                                                        />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                    />
                                                </Space>
                                            )
                                        )}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                Thêm dịch vụ
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
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
                            name={"introduction"}
                            label="Phần mô tả giới thiệu"
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                // ...layout.wrapperCol,
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
                </Flex>
            </div>
        </AuthorizeView>
    );
}
