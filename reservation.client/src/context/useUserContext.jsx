import { createContext } from "react";

const defaultValue = {
    user: {},
}

export const UserContext = createContext(defaultValue)