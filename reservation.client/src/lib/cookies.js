import Cookies from "js-cookie";

const oneDays = 1440 

const set = (key, value, minute) => {
    const expired = new Date(new Date().getTime() + minute * 60 * 1000);

    Cookies.set(key, value, {
        expires: expired
    })
}

const get = (key) => {
    return Cookies.get(key)
}

const remove = (key) => {
    Cookies.remove(key)
}

const setAccessToken = accessToken => {
    set("accessToken", accessToken, oneDays)
}

const setRefreshToken = refresh => {
    set("refreshToken", refresh, oneDays * 2)
}

const getAccessToken = () => {
    return get("accessToken")
}

export const Cookie = {
    set: set,
    get: get,
    remove: remove,
    setAccessToken: setAccessToken,
    setRefreshToken: setRefreshToken,
    getAccessToken: getAccessToken
}