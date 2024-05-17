import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Image, Upload } from "antd";
import { R2 } from "../../lib/R2";
import { useDispatch } from "react-redux";
import { hide, show } from "../../state/loading/loadingSlice";
import { ProfileContext } from "../../context/useProfileContext";
import { getUserName } from "../../lib/helper";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UploadComponent = ({ max, buttonTitle, collaborator, isAvatar = false }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [userName, setUserName] = useState("")
    const [fileList, setFileList] = useState([]);
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const profile = useContext(ProfileContext)
    useEffect(() => {
        const fetchAndSetFileList = async () => {
            try {
                console.log(userName, isAvatar, collaborator)
                if(!userName) return
                const result = await R2.get(userName, isAvatar);

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
    }, [userName]);

    useEffect(() => {
        if(isAvatar){
            setUserName(getUserName(profile.collaborator.email))
        }
        
    }, [profile])

    useEffect(() => {
        if(isAvatar){
            handleUpload()
        }
    }, [fileList])

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
        if(isAvatar && fileList.length){
            const result = await R2.delete(fileList[0].name)
        }
        setFileList(newFileList);
    };

    const handleUpload = async () => {
        if(!fileList.length){
            return
        }

        dispatch(show())
        for (let file of fileList) {
            if (!file.originFileObj || !file.type.startsWith("image")) {
                continue;
            }

            try {
                const image = await getBase64(file.originFileObj);
                const fileName = `${userName}/${isAvatar ? `avatar.${file.type.split("/")[1]}` : `albums/${file.name}`}`

                const result = await R2.upload(
                    fileName,
                    image,
                    file.type
                );
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
                !isAvatar && <Button
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
export default UploadComponent;
