import Cookies from "js-cookie";

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

export const Cookie = {
    set: set,
    get: get,
    remove: remove
}