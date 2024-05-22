import React, { useState } from "react";
import { Col, InputNumber, Row, Slider, Space, Typography } from "antd";
const { Text } = Typography;

const IntegerStep = ({ rangeValue, setRangeValue, min, max }) => {
    const onChange = (newValue) => {
        setRangeValue(newValue);
    };

    return (
        <Row>
            <Col span={4}>
                <Slider
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={typeof rangeValue === "number" ? rangeValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={min}
                    max={max}
                    style={{
                        margin: "0 16px",
                    }}
                    value={rangeValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};
const Range = ({ rangeValue, setRangeValue, width, label, min, max}) => (
    <Space
        style={{
            width: width
        }}
        direction="vertical"
    >
        <Text>{label}</Text>
        <IntegerStep min={min} max={max} rangeValue={rangeValue} setRangeValue={setRangeValue}/>
        {/* <DecimalStep /> */}
    </Space>
);
export default Range;
