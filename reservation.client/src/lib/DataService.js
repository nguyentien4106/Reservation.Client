import axios from "axios";
import { getLocal, setLocal } from "./helper";
import { Cookie } from "./cookies";
import { AUTH_PATH } from "../constant/urls";

const BASE_URL = "https://localhost:7080/"

const service = axios.create()

const authUrls = [AUTH_PATH.login, AUTH_PATH.logout, AUTH_PATH.refreshToken, AUTH_PATH.register]

const beforeRequest = request => {
    if(authUrls.some(item => request.url.includes(item))){
        return request
    }

    const refreshToken = Cookie.get("refreshToken")
    if(!refreshToken){
        setLocal("email", "")
        window.location.href = "/"
        return
    }

    const accessToken = Cookie.get("accessToken")
    if(!accessToken){
        service.post(AUTH_PATH.refreshToken, {
            AccessToken: getLocal("accessToken"),
            refreshToken: refreshToken
        }).then(res => {
            const { data } = res

            Cookie.setAccessToken(data.accessToken)
            Cookie.setRefreshToken(data.refreshToken)
        })
    }

    return request
}

service.interceptors.request.use(beforeRequest, function (error) {
    return Promise.reject(error);
})

service.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error);
})

export default class DataService{
    static post(url, data, options){
        return service.post(BASE_URL + url, data, {
            headers: {
                Authorization: `Bearer ${Cookie.getAccessToken()}`
            }
        })
    }

    static get(url){
        return service.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${Cookie.getAccessToken()}`
            }
        })
    }
}