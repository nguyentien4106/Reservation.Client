import React, { useState, createContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getLocal } from '../lib/helper';
import { Typography  } from 'antd';
import useFetchUser from '../hooks/useFetchUser';
import { ROLES } from '../constant/settings';
const { Text, Link } = Typography;

const UserContext = createContext({});

function AuthorizeView(props) {
    const navigate = useNavigate();
    const user = useFetchUser();

    if(!user){
        return (
            <>
                <Text >Bạn cần đăng nhập để đăng ký dịch vụ</Text>{" "}
    
                <Link onClick={() => navigate("/login")}>Sign in</Link>
    
                {/* <Navigate to="/login" /> */}
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

            {/* <Link onClick={() => navigate("/login")}>Sign in</Link> */}

            {/* <Navigate to="/login" /> */}
        </>
    )
}

export function AuthorizedUser(props) {
    // Consume the username from the UserContext
    const user = React.useContext(UserContext);

    console.log('user', user)
    // Display the username in a h1 tag
    if (props.value == "email")
        return <>{user.email}</>;
    else
        return <></>
}

export default AuthorizeView;