import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Image, Upload } from "antd";
import { R2 } from "../../lib/R2";
import { getLocal } from "../../lib/helper";
import { useDispatch } from "react-redux";
import { hide, show } from "../../state/loading/loadingSlice";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadComponent = ({ turnedOnProfile }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const username = getLocal("email").split("@")[0];

    useEffect(() => {
        const fetchAndSetFileList = async () => {
            try {
                const result = await R2.get(username);
                if (result) {
                    const items = await Promise.all(result.map(item => item));
                    const updatedFileList = items.map(async res => {
                        const url = await res.url;
                        return {
                            uid: res.content.Key,
                            name: res.content.Key,
                            status: 'done',
                            url: url,
                        };
                    });
                    setFileList(await Promise.all(updatedFileList));
                }
            } catch (error) {
                message.error(`Error loading images from server beacuse ${error}`);
            }
        };
    
        fetchAndSetFileList();
    }, []);

    const onFileRemove = (file) => {
        if (file.originFileObj) {
            message.success("Successfully deleted image");
            return;
        }

        dispatch(show());
        R2.delete(file.name)
            .then((res) => {
                message.success("Successfully deleted image");
            })
            .catch((err) => {
                message.error(`${err.message}`);
            })
            .finally(() => {
                dispatch(hide());
            });
    };

    const onFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUpload = async () => {
        dispatch(show())
        for (let file of fileList) {
            if (!file.originFileObj) {
                continue;
            }

            try {
                const image = await getBase64(file.originFileObj);
                const result = await R2.upload(
                    `${username}/${file.name}`,
                    image,
                    file.type
                );

                if (result.$metadata.httpStatusCode === 200) {
                    message.success("Successfully uploaded image");
                }
            } catch (err) {
                message.error(
                    `Failed to upload image because of ${err}. Please try again.`
                );
            }
        }

        dispatch(hide())
    };

    const onFilePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={onFilePreview}
                onChange={onFileChange}
                beforeUpload={() => false}
                onRemove={onFileRemove}
            >
                <button
                    style={{
                        border: 0,
                        background: "none",
                    }}
                    type="button"
                >
                    <PlusOutlined />
                    <div
                        style={{
                            marginTop: 8,
                        }}
                    >
                        Upload
                    </div>
                </button>
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: "none",
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
            <Button
                type="primary"
                onClick={() => handleUpload()}
                style={{ marginTop: "50px", textAlign: "center" }}
            >
                Cập nhật Albums
            </Button>
        </>
    );
};
export default UploadComponent;
