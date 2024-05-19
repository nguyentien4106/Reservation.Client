import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover, Space } from 'antd';
import LogoutLink from '@/components/auth/LogoutLink';

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
