import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Flex, Rate } from 'antd';

const customIcons = {
    1: <FrownOutlined style={{
        fontSize: 50,
    }}/>,
    2: <FrownOutlined style={{
        fontSize: 50
    }}/>,
    3: <MehOutlined style={{
        fontSize: 50
    }}/>,
    4: <SmileOutlined style={{
        fontSize: 50
    }}/>,
    5: <SmileOutlined style={{
        fontSize: 50
    }}/>,
};
const RateComponent = ({ setRate, rate }) => (
    <Flex gap="middle" vertical>
        <Rate defaultValue={rate} character={({ index = 0 }) => customIcons[index + 1]} onChange={setRate}/>
    </Flex>
);
export default RateComponent;