import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../lib/helper';
import { Typography  } from 'antd';
import { ROLES } from '../../constant/settings';
const { Text, Link } = Typography;

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
            <Text>Bạn không có quyền truy cập tài nguyên này. Xin thử lại sau!</Text>
        </>
    )
}

export default AuthorizeView;