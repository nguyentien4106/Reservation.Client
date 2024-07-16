import React, { useState } from "react";
import { Form, Input, Button, Modal, Checkbox } from "antd";
import RateComponent from "./RateComponent";
import UploadImageComponent from "../../common/UploadImageComponent";
import { generateMessages, getBase64, getUser, getUserName } from "../../../lib/helper";
import { R2 } from "@/lib/R2";
import DataService from "../../../lib/DataService";
import { CUSTOMER_PATH } from "../../../constant/urls";
import { useDispatch } from "react-redux";
import { show, hide } from "@/state/loading/loadingSlice";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

function ReviewContent({ order, message, setOrdersSrc, submit }) {
    const dispatch = useDispatch();

    const [rate, setRate] = useState(5)
    const [images, setImages] = useState([])

    const onFinish = async values => {
        if(!images.length) {
            message.error("Bạn cần upload ít nhất 1 hình ảnh hoặc video")
            return;
        }

        const imagesPush = await uploadImages()

        const params = Object.assign(values, { rate: rate, orderId: order.id, applicationUserId: getUser().id })
        dispatch(show())
        DataService.post(CUSTOMER_PATH.addReview, params)
        .then(res => {
            const { data } = res
            if(data?.isSucceed){
                message.success("Đăng review thành công!")
                setOrdersSrc(prev => prev.map(item => item.id === data?.data ? { ...item, id: data?.data } : item))
            }
            else {
                message.error("Đăng review không thành công!")
            }
        })
        .catch(err => message.error(generateMessages(err)))
        .finally(() => {
            dispatch(hide())
            Modal.destroyAll()
        })

    }

    const uploadImages = async () => {
        if (!images.length) {
            return
        }

        for (let file of images) {
            if (!file.originFileObj || !file.type.startsWith("image")) {
                continue;
            }

            try {
                const image = await getBase64(file.originFileObj);
                const fileName = `${getUserName(order?.collaboratorEmail)}/reviews/${order?.id}_${file.name}`

                await R2.upload(fileName, image, file.type);
            } catch (err) {
                message.error(
                    `Failed to upload image because of ${err}. Please try again.`
                );

                return false
            }
        }
    };
    return (
        <>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 1000,
                    marginTop: 20
                }}
                initialValues={{
                    recommend: true
                }}
            >
                <Form.Item
                >
                    <RateComponent  setRate={setRate} rate={rate}/>
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    tooltip="Cảm nhận chung của bạn về người này"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input minLength={10} maxLength={255}/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Nhận xét"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input minLength={10}/>
                </Form.Item>

                <Form.Item
                    name="recommend"
                    label="Đề xuất cho mọi người"
                    valuePropName="checked"
                >
                    <Checkbox />
                </Form.Item>
                <Form.Item>
                    <UploadImageComponent setImages={setImages} images={images}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                    hidden
                >
                    {
                        <Button type="primary" htmlType="submit" ref={submit}>
                            Đăng Review
                        </Button>
                    }
                </Form.Item>
            </Form>
        </>
    )
}

export default ReviewContent
