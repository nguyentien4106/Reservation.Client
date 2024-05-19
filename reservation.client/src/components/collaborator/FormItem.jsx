import React from 'react'
import {
    Form,
} from "antd";
function FormItem({ item, value }) {

    const { name, label, tooltip } = item
    return (
        <Form.Item
            name={name}
            label={label}
            tooltip={tooltip}
        >
            {
                value
            }
        </Form.Item>
    )
}

export default FormItem
