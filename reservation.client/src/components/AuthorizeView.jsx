import React, { useState, createContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getLocal } from '../lib/helper';
import { Typography  } from 'antd';
const { Text, Link } = Typography;

const UserContext = createContext({});

function AuthorizeView(props) {
    const authorized = getLocal("email") ? true : false
    const navigate = useNavigate();

    if(authorized) {
        return (
            <>
                {props.children}
            </>
        );
    } 
    
    return (
        <>
            <Text >Bạn cần đăng nhập để đăng ký dịch vụ</Text>{" "}

            <Link onClick={() => navigate("/login")}>Sign in</Link>

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