import {configureStore} from '@reduxjs/toolkit'
import { alertSlice } from './Features/AlertSlice'


export default configureStore({
    reducer:{
        alert:alertSlice.reducer
    }
}) 