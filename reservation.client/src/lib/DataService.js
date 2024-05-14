import axios from "axios";
import { getLocal, setLocal } from "./helper";
import { Cookie } from "./cookies";

const BASE_URL = "https://localhost:7080/"

const service = axios.create()

const beforeRequest = request => {
    if(request.url.includes("Auth/Login") || request.url.includes("Auth/Logout")|| request.url.includes("Auth/RegenerateToken")){
        return request
    }
    const refreshToken = Cookie.get("refreshToken")
    console.log('refresh', refreshToken)
    console.log('refresh', request)

    if(!refreshToken){
        // window.location.href = "/"
        setLocal("email", "")
    }

    const accessToken = Cookie.get("accessToken")
    console.log(accessToken)

    if(!accessToken){
        service.get(`Auth/RegenerateToken?email=${getLocal("email")}`).then(res => {
            const { data } = res
            console.log(data)
            Cookie.set("accessToken", data.accessToken)
            Cookie.set("refreshToken", data.refreshToken)
        })
    }


}

service.interceptors.request.use(beforeRequest, function (error) {
    return Promise.reject(error);

})

service.interceptors.response.use(response => {
    console.log(response)
    return response
}, error => {
    console.log(error)
    return Promise.reject(error);

})

export default class DataService{
    static post(url, data, options){
        return service.post(BASE_URL + url, data, {
            headers: {
                Authorization: `Bearer ${Cookie.get("accessToken")}`
            }
        })
    }

    static get(url){
        return service.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${Cookie.get("accessToken")}`
            }
        })
    }
}