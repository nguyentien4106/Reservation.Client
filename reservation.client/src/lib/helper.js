export const generateMessages = (messages) => Object.values(messages).join("\n")

export const setLocal = (key, value) => localStorage.setItem(key, value)

export const getLocal = key => localStorage.getItem(key) ?? null