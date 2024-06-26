
import { Typography } from "antd";
import { Cookie } from "@/lib/cookies";
import DataService from "@/lib/DataService";
import { AUTH_PATH } from "@/constant/urls";
import { useDispatch, useSelector } from "react-redux";
import { hide, show } from "@/state/loading/loadingSlice";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../state/user/userSlice";

const { Link } = Typography;

function LogoutLink() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(show())
        DataService.post(AUTH_PATH.logout).then(res => {
            Cookie.remove("accessToken")
            Cookie.remove("refreshToken")
            localStorage.removeItem("collaboratorId")
            dispatch(removeUser())
        })
        .finally(() => {
            dispatch(hide())
            navigate("/")
        })
    }

    return (
        <Link onClick={handleLogout} style={{fontSize: 16}}>{`Đăng xuất`}</Link>
    );
}

export default LogoutLink;