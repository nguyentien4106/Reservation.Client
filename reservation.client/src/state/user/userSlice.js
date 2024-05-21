import { createSlice } from "@reduxjs/toolkit"
import { getUser } from "../../lib/helper"

const initialState = {
    user: getUser() ?? {}
}

const userSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = Object.assign(state.user, action.payload)
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;