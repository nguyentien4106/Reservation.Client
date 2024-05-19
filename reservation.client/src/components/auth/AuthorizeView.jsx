import React, { useState, createContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getLocal, getUser } from '../../lib/helper';
import { Typography  } from 'antd';
import { ROLES } from '../../constant/settings';
const { Text, Link } = Typography;

const UserContext = createContext({});

function AuthorizeView(props) {
    const navigate = useNavigate();
    const user = getUser();

    if(!user){
        return (
            <>
                <Text >Bạn cần đăng nhập để đăng ký dịch vụ</Text>{" "}
                <Link onClick={() => navigate("/login")}>Sign in</Link>
            </>
        )
    }

    if(ROLES[user.role] >= props.role) {
        return (
            <>
                {props.children}
            </>
        );
    } 

    
    
    return (
        <>
            <Text>Bạn không có quyền truy cập tài nguyên này. Xin thử lại sau!</Text>{" "}
        </>
    )
}

export function AuthorizedUser(props) {
    // Consume the username from the UserContext
    const user = React.useContext(UserContext);

    // Display the username in a h1 tag
    if (props.value == "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;