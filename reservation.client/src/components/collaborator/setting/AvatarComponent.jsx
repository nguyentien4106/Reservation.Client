import { App, Upload, Image } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { getBase64, getUserName } from '../../../lib/helper';
import { ProfileContext } from '../../../context/useProfileContext';
import { PlusOutlined } from "@ant-design/icons";
import { R2 } from '../../../lib/R2';

function AvatarComponent({ setHasAvatar }) {
    const [fileList, setFileList] = useState([]);
    const { message } = App.useApp();
    const profile = useContext(ProfileContext)
    const userName = getUserName(profile.collaborator?.email)

    useEffect(() => {
        const fetchAndSetFileList = async () => {
            try {
                if (!userName) return

                const result = await R2.getAvatar(userName);
                if (!result.length) return
                setFileList([{
                    uid: result.content.Key,
                    name: result.content.Key,
                    status: 'done',
                    url: result.url,
                }]);
                setHasAvatar(true)

            } catch (error) {
                message.error(`Error loading images from server beacuse ${error}`);
            }
        };

        fetchAndSetFileList();
    }, [userName])

    const onFileChange = async (change) => {
        if (!change.fileList.length) {
            const deleteAvatar = () => {
                R2.delete(fileList[0].name).then(res => {
                    const isSucceed = res.$metadata.httpStatusCode === 204
                    message.open({
                        type: isSucceed ? "success" : "error",
                        content: isSucceed ? "Đã xoá avatar" : "Xoá lỗi, thử lại!",
                        duration: 5
                    })
                })
                setHasAvatar(false)
            }

            deleteAvatar()
        }
        else {
            const uploadAvatar = async () => {
                const { originFileObj, type } = change.fileList[0]
                const image = await getBase64(originFileObj);
                const fileName = `${userName}/avatar.${type.split("/")[1]}`
                R2.upload(fileName, image, type).then(res => {
                    const isSucceed = res.$metadata.httpStatusCode == 200
                    message.open({
                        type: isSucceed ? "success" : "error",
                        content: isSucceed ? "Tải ảnh lên thành công" : "Tải ảnh lên thất bại, thử lại!",
                        duration: 5
                    })
                })
                setHasAvatar(true)
            }
            uploadAvatar()
        }

        setFileList(change.fileList)
    }

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onFileChange}
                beforeUpload={() => false}
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
        </>

    )
}

export default AvatarComponent
