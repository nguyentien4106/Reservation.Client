import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Image, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { getBase64, getUserName } from "@/lib/helper";
import { R2 } from "@/lib/R2";

const LeaseAlbumComponent = ({ max, buttonTitle }) => {
    const dispatch = useDispatch();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const { message } = App.useApp();
    const { user } = useSelector(store => store.user)
    const userName = getUserName(user?.userName)

    useEffect(() => {
        const fetchAndSetFileList = async () => {
            try {
                if (!userName) return

                const result = await R2.get(userName);
                if (!result) return

                const newFileList = result.map(res => ({
                    uid: res.content.Key,
                    name: res.content.Key,
                    status: 'done',
                    url: res.url,
                }));

                setFileList(newFileList);
            } catch (error) {
                message.error(`Error loading images from server beacuse ${error}`);
            }
        };

        fetchAndSetFileList();
    }, [userName]);

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

    const onFileChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleUpload = async () => {
        if (!fileList.length) {
            return
        }

        dispatch(show())
        for (let file of fileList) {
            if (!file.originFileObj || !file.type.startsWith("image")) {
                continue;
            }

            try {
                const image = await getBase64(file.originFileObj);
                const fileName = `${userName}/albums/${file.name}`

                await R2.upload(fileName,image,file.type);
            } catch (err) {
                message.error(
                    `Failed to upload image because of ${err}. Please try again.`
                );
            }
        }
        dispatch(hide())
        message.success("Successfully uploaded image");
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
                maxCount={max ? max : 1000}
                accept="image/*"
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
            {
                <Button
                    type="primary"
                    onClick={() => handleUpload()}
                    style={{ marginTop: "50px", textAlign: "center" }}
                >
                    {buttonTitle}
                </Button>
            }
        </>
    );
};
export default LeaseAlbumComponent;
