import { configureStore } from "@reduxjs/toolkit";

import loadingReducer from './loading/loadingSlice'

import authReducer from './auth/authSlice'


export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer
    },

})

export const getState = () => store.getState()

export const dispatch = () => store.dispatch()