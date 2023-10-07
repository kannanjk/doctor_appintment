import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './Features/AlertSlice'
import { userSlice } from './Features/GetUser'

export default configureStore({
    reducer: {
        alert: alertSlice.reducer,
        user: userSlice.reducer
    }
})     