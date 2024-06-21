import React, { useEffect, useState } from "react";
import DataService from "../../../lib/DataService";
import { App, Button, Flex, Form, Input, Modal, Table } from "antd";
import Column from "antd/es/table/Column";
import { useDispatch } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";

export default function Services() {
    const [services, setServices] = useState([]);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { message } = App.useApp();

    useEffect(() => {
        DataService.get("Services").then((res) => {
            console.log(res.data);
            setServices(res.data.data);
        });
    }, []);

    const onFinish = (values) => {
        dispatch(show());
        DataService.post("Services", values)
            .then((res) => {
                console.log(res.data);
                if (res.data.isSucceed) {
                    message.success("Thêm mới thành công");
                } else {
                    message.error("Thêm mới khoogn thành công");
                }
            })
            .finally(() => {
                dispatch(hide());
                Modal.destroyAll();
                setOpen(false);
            });
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Add new</Button>

            <Flex justify="center" vertical>
                <Table dataSource={services} style={{ width: "50%" }}>
                    <Column
                        title="Id"
                        dataIndex="id"
                        render={(text) => text.substring(0, 8)}
                    />
                    <Column title="Profile" dataIndex="name" />
                    <Column title="Description" dataIndex="description" />
                </Table>
                {open && (
                    <Modal
                        open={open}
                        onCancel={() => setOpen(false)}
                        footer={null}
                    >
                        <Form
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item label="Description" name="description">
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                )}
            </Flex>
        </>
    );
}
