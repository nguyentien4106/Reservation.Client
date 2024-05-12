
import { Typography } from "antd";

const { Link } = Typography;

function LogoutLink({ email, handleLogout }) {

    return (
        <Link onClick={handleLogout} >{`${email} Logout`}</Link>
    );
}

export default LogoutLink;