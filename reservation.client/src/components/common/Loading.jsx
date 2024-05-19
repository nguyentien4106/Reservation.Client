import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = ({ fullScreen = true, size = "large" }) => (
  <Spin
    fullscreen={fullScreen}
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 48,
        }}
        spin
      />
    }
    size={size}
  />
);
export default Loading;