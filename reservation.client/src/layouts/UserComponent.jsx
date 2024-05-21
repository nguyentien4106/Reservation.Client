import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import LogoutLink from '@/components/auth/LogoutLink';
import { Link } from 'react-router-dom';

function UserComponent({ user }) {
    console.log(user)
    const content = (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            width: "100%"
        }}>
            <Link to={"/account"}>{user?.userName}</Link>
            <LogoutLink />
        </div>
    )


    return (
        <div className='pointer'>
            <Popover
                content={content}
            >
                <Avatar 
                    size={48} 
                    icon={<UserOutlined />} 
                    style={{ backgroundColor: 'rgb(203 159 125)' }}
                />

            </Popover>
           
        </div>
    )
}

export default UserComponent
