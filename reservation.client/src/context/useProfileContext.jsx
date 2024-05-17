import { createContext } from "react";

const defaultValue = {
    collaborator: {},
}

export const ProfileContext = createContext(defaultValue)