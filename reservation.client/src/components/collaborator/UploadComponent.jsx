import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Image, Upload } from "antd";
import { R2 } from "../../lib/R2";
import { getLocal } from "../../lib/helper";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const maxImagesLength = 10

const UploadComponent = ({ turnedOnProfile }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);
    const [ files, setFiles ] = useState([])
    const email = getLocal("email")

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            console.log(file)
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList : newFileList, file }) => {
        if(files.length > newFileList.length){
            setFiles(prev => prev.filter(item => item.uid !== file.uid))
        }
        else {
            setFiles(prev => [...prev, file])
        }
        setFileList(newFileList)
    }

    const uploadButton = (
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
    );
    const { message } = App.useApp();
    const username = email.split("@")[0]

    const handleUpload = async () => {
        for(let file of files){
            const image = await getBase64(file)
            R2.upload(`${username}//${file.name}`, image, file.type)
                    .then(result => console.log(result))
                    .catch((err) => console.error(err))
        }

        message.success("Successfully upload image");
    }

    useEffect(() => {
        R2.get(username).then(res => {
            console.log(res)
        })
    }, [])

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file) => {
                    setFileList([...fileList, file])
                    return false;
                }}
            >
                {fileList.length >= maxImagesLength ? null : uploadButton}
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
            <Button type="primary" onClick={() => handleUpload()} style={{ marginTop: "50px" }}>Cập nhật</Button>
        </>
    );
};
export default UploadComponent;
