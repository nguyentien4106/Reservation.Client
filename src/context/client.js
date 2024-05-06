import React, { useContext } from "react";

export const ClientContext = React.createContext();

export const useClient = () => useContext(ClientContext)