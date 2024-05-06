import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = () => (
  <Spin
    fullscreen={true}
    style={{backgroundColor: "rgb(175 166 166 / 45%)"}}
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 64,
        }}
        spin
      />
    }
  />
);

export default Loading;