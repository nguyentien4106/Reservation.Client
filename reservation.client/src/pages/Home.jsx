import WeatherForecast from "../components/WeatherForecast.jsx";
import LogoutLink from "../components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import { App, Button } from "antd";
import DataService from "../lib/DataService.js";
import { getLocal } from "../lib/helper.js";
import { useEffect, useState } from "react";
import { HOME_PATH } from "../constant/urls.js";

function Home() {
    const { message } = App.useApp();
    const [collaborators, setCollaborators] = useState([])
    
    const handleCheck = () => {
        DataService.get(`Auth/Profile?email=${getLocal("email")}`).then(res => {
            console.log(res)
            const { data } = res.data
        })
        .catch(err => {
            console.log(err)
            if(err.response.status === 401) {
                message.error("Bạn cần đăng nhập để thực hiện hành động này.")
            }
        })
    }

    useEffect(() => {
        DataService.get(HOME_PATH.getAll).then(res => {
            console.log(res.data)
            setCollaborators(res.data.data)
        })
        .catch(err => message.error(err.message))
    }, [])

    return (
        <>
            <h1>Home</h1>
            <Button onClick={handleCheck}>Check</Button>
        </>
    );
}

export default Home;