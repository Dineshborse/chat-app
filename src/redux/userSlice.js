import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "username",
        userEmail: "userEmail"
    },
    reducers: {
        update: (state, action) => {
            state.userName = action.payload.name;
            state.userEmail = action.payload.email;
        }
    }
})

export const { update } = userSlice.actions;
export default userSlice.reducer;