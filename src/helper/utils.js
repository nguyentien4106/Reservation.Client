export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key, defaultValue = "") => localStorage.getItem(key) ?? defaultValue

export const setSession = (key, value) => sessionStorage.setItem(key, value)

export const getSession = (key, defaultValue = "") => sessionStorage.getItem(key) ?? defaultValue

export const isAuth = () => getSession("isAuth") === "true"