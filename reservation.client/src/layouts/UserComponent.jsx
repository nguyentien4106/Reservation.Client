import React from 'react'
import LogoutLink from '../components/LogoutLink'
import { getLocal } from '../lib/helper'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Space } from 'antd';
import { Cookie } from '../lib/cookies';
import { jwtDecode } from 'jwt-decode';
import DataService from '../lib/DataService';
import { useDispatch } from 'react-redux';

function UserComponent({ user }) {

    const content = (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            width: "100%"
        }}>
            <a>{user.userName}</a>
            <LogoutLink />
        </div>
    )


    return (
        <div className='pointer'>
            <Popover
                content={content}
            >
                <Avatar 
                    size={64} 
                    icon={<UserOutlined />} 
                    onClick={() => console.log('click')}
                    style={{ backgroundColor: '#fde3cf' }}
                />

            </Popover>
           
        </div>
    )
}

export default UserComponent
