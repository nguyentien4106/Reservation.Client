import WeatherForecast from "../components/WeatherForecast.jsx";
import LogoutLink from "../components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.jsx";
import AppLayout from "../components/shared/layout/AppLayout.jsx";
import { Button } from "antd";
import DataService from "../lib/DataService.js";
import { getLocal } from "../lib/helper.js";

function Home() {
    const handleCheck = () => {
        DataService.get(`Auth/Profile?email=${getLocal("email")}`).then(res => {
            console.log(res)
            const { data } = res.data
        })
    }

    return (
        <>
            <h1>Home</h1>
            <Button onClick={handleCheck}>Check</Button>
        </>
    );
}

export default Home;