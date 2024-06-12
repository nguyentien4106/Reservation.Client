import { Modal } from "antd";
import React, { useState } from "react";

export default function ModalJob({ job, open, close }) {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

  
    const handleOk = () => {

    }

    const handleCancel = () => {
        close()
    }
    

    return (
        <Modal
            title={<>
                <strong>Đăng ký nhận job  </strong>
                <strong style={{ color: "rgb(16, 138, 0)"}}>{job.title}</strong>
            </>}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            
        </Modal>
    );
}
