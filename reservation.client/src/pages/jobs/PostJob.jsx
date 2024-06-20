import React, { useRef } from "react";
import AuthorizeView from "@/components/auth/AuthorizeView";
import { ROLES } from "../../constant/settings";
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
    App,
    Modal,
} from "antd";
import locationAPI from "../../api/locationAPI";
import useFetchServices from "../../hooks/useFetchServices";
import DataService from "../../lib/DataService";
import dayjs from "dayjs";
import { JOBS_PATH } from "../../constant/urls";
import { getUser } from "../../lib/helper";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { useNavigate } from "react-router-dom";
import { JOBS_ROUTE_PATH } from "../../constant/paths";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default function PostJob({ inModal, submitRef }) {
    const provinces = locationAPI.getProvinces();
    const services = useFetchServices();
    const dispatch = useDispatch()
    const { message } = App.useApp();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const userId = getUser().id;
        const params = Object.assign(values, {
            applicationUserId: userId,
            jobServices: values.services && values.services.map((item) => ({ serviceId: item })),
            status: 0,
        });
        dispatch(show())
        DataService.post(JOBS_PATH.createJob, params).then((res) => {
            const { data } = res
            if(data.isSucceed){
                message.success("Đã đăng job thành công. ")
                navigate(JOBS_ROUTE_PATH.jobs)
            }
            else{
                message.error("Đăng job thất bại. Vui lòng thử lại.")
            }
        }).catch(err => {
            message.error("Đăng job thất bại. Vui lòng thử lại.")
        }).finally(() => {
            dispatch(hide())
            Modal.destroyAll()
        });
    };

    const prefixSelector = (
        <Form.Item name="paymentType" noStyle>
            <Select
                style={{
                    width: 100,
                }}
            >
                <Select.Option value="1">Mỗi giờ</Select.Option>
                <Select.Option value="2">Toàn bộ</Select.Option>
            </Select>
        </Form.Item>
    );

    return (
        <AuthorizeView role={ROLES.USER}>
            <div
                style={{
                    textAlign: "center",
                }}
            >
                <h2>Thông tin job</h2>
            </div>

            <Flex
                justify="center"
                vertical={true}
                style={{
                    alignItems: "center",
                    width: "100%",
                    padding: inModal ? 0 : 20,
                }}
                align="center"
            >
                <Form
                    {...layout}
                    name="post-job-form"
                    onFinish={onFinish}
                    style={{
                        backgroundColor: "rgb(232, 232, 232)",
                        minWidth: inModal ? "100%": "60%",
                        width: inModal ? "100%": "60%",
                        padding: 30,
                        borderRadius: 20,
                    }}
                    initialValues={{
                        paymentType: "1",
                        dateTime: dayjs(),
                    }}

                    validateMessages={{
                        required: "Vui lòng nhập các field này."
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
                        label="Thời gian thực hiện"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker minDate={dayjs()} />
                    </Form.Item>

                    <Form.Item
                        name="required"
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
                        <InputNumber
                            addonBefore={prefixSelector}
                            min={10000}
                            width={"100%"}
                            style={{ width: "100%" }}
                            formatter={(value) =>
                                `đ ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )
                            }
                            parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                        />
                    </Form.Item>

                    <Form.Item
                        name={"services"}
                        label="Dịch vụ muốn thuê?"
                        tooltip={
                            "Chúng tôi sẽ gửi thông báo tới cho những người gần bạn và có dịch vụ bạn đang tìm."
                        }
                    >
                        <Select options={services} mode="multiple"></Select>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            // ...layout.wrapperCol,
                            offset: 8,
                        }}
                        hidden={inModal}
                    >
                        {
                            <Button type="primary" htmlType="submit" ref={submitRef}>
                                Đăng "job"
                            </Button>
                        }
                    </Form.Item>
                </Form>
            </Flex>
        </AuthorizeView>
    );
}
