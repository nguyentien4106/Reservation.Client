import React, { useRef, useState } from "react";
import AuthorizeView from "@/components/auth/AuthorizeView";
import { ROLES } from "../../constant/settings";
import { App, Button, Flex, Form, Input, Modal } from "antd";
import DataService from "../../lib/DataService";
import { JOBS_PATH } from "../../constant/urls";
import { getBase64, getLocal, getUser, getUserName } from "../../lib/helper";
import UploadImageComponent from "../common/UploadImageComponent";
import { ACCOUNT_ROUTE_PATH } from "@/constant/paths.js";
import { Link } from "react-router-dom";
import { R2 } from "@/lib/R2";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";

export default function JobApplyInformation({
    job,
    close,
    setOpen,
    setAppliedJobs,
}) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const submit = useRef();
    const { message } = App.useApp();
    const user = getUser();
    const collaboratorId = getLocal("collaboratorId");
    const [imagesApplied, setImagesApplied] = useState([]);
    const dispatch = useDispatch()

    const handleOk = async () => {
        if(!user){
            message.error("Bạn cần đăng nhập trước !")
            return
        }
        if (!imagesApplied.length && !collaboratorId) {
            message.error("Bạn phải upload ít nhất 1 tấm hình");
            return;
        }
        await uploadImages(imagesApplied)
        submit.current.click();
        Modal.destroyAll();
        setAppliedJobs((prev) => [...prev, job.id]);
    };

    const handleCancel = () => {
        close();
    };

    const uploadImages = async (images) => {
        if (!images.length) {
            return
        }

        for (let file of images) {
            if (!file.originFileObj || !file.type.startsWith("image")) {
                continue;
            }

            try {
                const image = await getBase64(file.originFileObj);
                const fileName = `${getUserName(user?.email)}/jobs/${job.id}_${file.name}`

                await R2.upload(fileName, image, file.type);
            } catch (err) {
                message.error(
                    `Failed to upload image because of ${err}. Please try again.`
                );

                return false
            }
        }
    };

    const onFinish = (values) => {
        setConfirmLoading(true);
        const params = Object.assign(values, {
            jobId: job.id,
            applicationUserId: getUser().id,
        });
        dispatch(show())
        DataService.post(JOBS_PATH.applyJob, params)
            .then((res) => {
                const { data } = res.data;
                if (data) {
                    message.success(
                        "Bạn đã ứng tuyển thành công. Vui lòng chờ đối phương liên hệ hoặc check thông tin ở trong phần cài đặt.",
                        10
                    );
                    setOpen(false);
                }
            })
            .catch((err) => {
                message.error("Đã có lỗi xảy ra. Vui lòng thử lại", err);
            })
            .finally(() => {
                setOpen(false);
                dispatch(hide())

            });
    };

    return (

        <Modal
            title={
                <div style={{ color: "rgb(16, 138, 0)", textAlign: "center" }}>
                    <strong>{job.title}</strong>
                </div>
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
                    initialValues={{
                        name: `${user?.firstName} ${user?.lastName}`,
                        phoneNumber: user?.phoneNumber,
                    }}
                >
                    <Form.Item label="Tên" name="name">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Số ĐT liên lạc cho bạn"
                        name="phoneNumber"
                    >
                        <Input disabled />
                    </Form.Item>
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
                        <Input.TextArea placeholder="Bạn có thể mô tả thêm về bạn hoặc bla bla" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        hidden
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            hidden
                            ref={submit}
                        >
                            Submit
                        </Button>
                    </Form.Item>

                    {!collaboratorId ? (
                        <>
                            <Flex
                                vertical
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                    color: "red",
                                    marginBottom: 10,
                                }}
                            >
                                <strong>
                                    Vì bạn chưa có hồ sơ{" "}
                                    <Link
                                        to={
                                            ACCOUNT_ROUTE_PATH.collaboratorSetting
                                        }
                                    >
                                        <i>
                                            <u>Talent</u>
                                        </i>
                                    </Link>{" "}
                                    nên bạn phải upload ít nhất 1 hình ảnh
                                </strong>
                            </Flex>
                            <Form.Item
                                label="Hình ảnh"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <UploadImageComponent
                                    setImages={setImagesApplied}
                                    images={imagesApplied}
                                />
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                    color: "red",
                                    marginBottom: 10,
                                }}
                            >
                                <strong>
                                    <i>
                                        Chúng tôi sẽ gửi hồ sơ Talent của bạn
                                        cho chủ Job
                                    </i>
                                </strong>
                            </div>
                        </>
                    )}
                </Form>
            </AuthorizeView>

        </Modal>

    );
}
