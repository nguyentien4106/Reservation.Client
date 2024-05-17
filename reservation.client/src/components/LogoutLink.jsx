
import { Typography } from "antd";
import { Cookie } from "../lib/cookies";
import DataService from "../lib/DataService";
import { AUTH_PATH } from "../constant/urls";
import { useDispatch } from "react-redux";
import { hide, show } from "../state/loading/loadingSlice";

const { Link } = Typography;

function LogoutLink() {
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(show())
        DataService.post(AUTH_PATH.logout).then(res => {
            Cookie.remove("accessToken")
            Cookie.remove("refreshToken")
        })
        .finally(() => {
            dispatch(hide())
        })
    }

    return (
        <Link onClick={handleLogout} >{`Logout`}</Link>
    );
}

export default LogoutLink;