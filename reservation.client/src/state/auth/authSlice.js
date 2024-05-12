import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: false,
    email: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth
            state.email = action.payload.email
        },
    }
})

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;