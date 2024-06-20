import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { getBase64 } from "@/lib/helper";
import { R2 } from "@/lib/R2";

const UploadImageComponent = ({ images, setImages }) => {
    const [fileList, setFileList] = useState([]);

    const onFileChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setImages(newFileList)
    };

    const onFilePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewOpen(true);
    };

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={images}
                onPreview={onFilePreview}
                onChange={onFileChange}
                beforeUpload={() => false}
                maxCount={30}
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
    );
};
export default UploadImageComponent;
