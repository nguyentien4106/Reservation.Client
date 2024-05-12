import axios from "axios";
import { getLocal } from "./helper";

const BASE_URL = "https://localhost:7080/"

export default class DataService{
    static post(url, data, options){
        return axios.post(BASE_URL + url, data, {
            headers: {
                Authorization: `Bearer ${getLocal("accessToken")}`
            }
        })
    }

    static get(url){
        return axios.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${getLocal("accessToken")}`
            }
        })
    }
}