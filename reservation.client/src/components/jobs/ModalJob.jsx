import React, { useRef, useState } from "react";
import AuthorizeView from "@/components/auth/AuthorizeView";
import { ROLES } from "../../constant/settings";
import { App, Button, Checkbox, Form, Input, Modal } from "antd";
import DataService from "../../lib/DataService";
import { JOBS_PATH } from "../../constant/urls";
import { getUser } from "../../lib/helper";

export default function ModalJob({ job, close, setOpen, setAppliedJobs }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const submit = useRef()
    const { message } = App.useApp()

    const handleOk = () => {
        submit.current.click()
        Modal.destroyAll()
        setAppliedJobs(prev => [...prev, job.id])
    };

    const handleCancel = () => {
        close();
    };

    const onFinish = (values) => {
        setConfirmLoading(true)
        const params = Object.assign(values, {
            jobId: job.id,
            applicationUserId: getUser().id,
        })
        DataService.post(JOBS_PATH.applyJob, params).then(res => {
            const { data } = res.data
            if(data){
                message.success("Bạn đã ứng tuyển thành công. Vui lòng chờ đối phương liên hệ hoặc check thông tin ở trong phần cài đặt.", 10)
                setOpen(false)
            }
        }).catch(err => {
            message.error("Đã có lỗi xảy ra. Vui lòng thử lại", err)
        }).finally(() => {
            setOpen(false)
        })
        
    };

    return (
        <Modal
            title={
                <>
                    <strong>Đăng ký nhận job </strong>
                    <strong style={{ color: "rgb(16, 138, 0)" }}>
                        {job.title}
                    </strong>
                </>
            }
            onOk={handleOk}
            okText="Ứng tuyển"
            cancelText="Huỷ"
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={"50%"}
            open={true}
        >
            <AuthorizeView role={ROLES.USER}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 750,
                    }}
                    onFinish={onFinish}
                    disabled={confirmLoading}
                >
                    <Form.Item
                        label="Phương thức liên hệ"
                        name="contact"
                        rules={[
                            {
                                required: true,
                                message: "Nhập phương thức liên hệ trước",
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Bạn có thể để lại nhiều phương thức liên lạc như sđt, zalo,... để họ có thể liên hệ" />
                    </Form.Item>

                    <Form.Item
                        label="Thông tin thêm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Bạn có thể mô tả thêm về bạn hoặc bla bla"/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        hidden
                    >
                        <Button type="primary" htmlType="submit" hidden ref={submit}>
                            Submit
                        </Button>
                    </Form.Item>
                    
                </Form>
            </AuthorizeView>
        </Modal>
    );
}
