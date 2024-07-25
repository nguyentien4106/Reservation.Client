import { App, Upload, Image } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getBase64, getUserName } from "../../../lib/helper";
import { PlusOutlined } from "@ant-design/icons";
import { R2 } from "../../../lib/R2";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";

function AvatarComponent({ setHasAvatar }) {
    const [fileList, setFileList] = useState([]);
    const { message } = App.useApp();
    const { user } = useSelector(store => store.user);
    const userName = getUserName(user?.email);

    useEffect(() => {
        const fetchAndSetFileList = async () => {
            try {
                if (!userName) return;
                const result = await R2.getAvatar(userName);
                if (!result) return;
                setFileList([
                    {
                        uid: result.content?.Key,
                        name: result.content?.Key,
                        status: "done",
                        url: result?.url,
                    },
                ]);
                setHasAvatar(true);
            } catch (error) {
                message.error(
                    `Error loading images from server beacuse ${error}`
                );
            }
        };

        fetchAndSetFileList();
    }, [userName]);

    const onRemoveFile = async (file) => {
        const deleteAvatar = () => {
            R2.delete(file.name).then((res) => {
                const isSucceed = res.$metadata.httpStatusCode === 204;
                message.open({
                    type: isSucceed ? "success" : "error",
                    content: isSucceed ? "Đã xoá avatar" : "Xoá lỗi, thử lại!",
                    duration: 5,
                });
            });
            setHasAvatar(false);
            setFileList([]);
        };

        deleteAvatar();
    };

    const deleteAvatar = (isNotify = true) => {
        R2.delete(fileList[0].name).then((res) => {
            const isSucceed = res.$metadata.httpStatusCode === 204;
            if(isNotify){
                message.open({
                    type: isSucceed ? "success" : "error",
                    content: isSucceed ? "Đã xoá avatar" : "Xoá lỗi, thử lại!",
                    duration: 5,
                });
            }
        });
        setHasAvatar(false);
    };

    const uploadAvatar = async (file) => {
        const image = await getBase64(file);
        const fileName = `${userName}/avatar/${file.name}`;
        R2.upload(fileName, image, file.type).then((res) => {
            const isSucceed = res.$metadata.httpStatusCode == 200;
            message.open({
                type: isSucceed ? "success" : "error",
                content: isSucceed
                    ? "Tải ảnh lên thành công"
                    : "Tải ảnh lên thất bại, thử lại!",
                duration: 5,
            });
        });
        setHasAvatar(true);
    };

    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            if(fileList.length){
                deleteAvatar(false)
            }

            setFileList(prev => prev.length ? prev.map(item => ({ ...item, url: reader.result })) : [{ url: reader.result, name: file.name }]);
            uploadAvatar(file)
        };

        return false;
    };

    return (
        <ImgCrop showReset showGrid aspect={1 / 1} quality={1}>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onRemove={onRemoveFile}
                beforeUpload={beforeUpload}
                maxCount={1}
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
        </ImgCrop>
    );
}

export default AvatarComponent;
