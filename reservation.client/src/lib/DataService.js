import axios from "axios";
import { getLocal, setLocal } from "./helper";
import { Cookie } from "./cookies";
import { AUTH_PATH } from "../constant/urls";

const BASE_URL = import.meta.env.VITE_BASE_URL

const service = axios.create()

const AUTH_REQUEST = "Auth/"
const beforeRequest = request => {
    if(request.url.includes(AUTH_REQUEST)){
        return request
    }

    const refreshToken = Cookie.get("refreshToken")
    if(!refreshToken){
        return request
    }

    const accessToken = Cookie.get("accessToken")
    if(!accessToken){
        axios.post(BASE_URL + AUTH_PATH.refreshToken, {
            AccessToken: getLocal("accessToken"),
            refreshToken: refreshToken
        }).then(res => {
            const { data } = res.data
            
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
        console.log(BASE_URL + url)
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