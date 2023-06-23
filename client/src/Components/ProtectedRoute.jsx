import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/Features/AlertSlice'
import axios from 'axios'
import { setUser } from '../Redux/Features/GetUser'

function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) =>
    state.user
    )

    const getUser = async ()=>{
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/getUseData',
            {token:localStorage.getItem('token')},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                dispatch(setUser(res.data.data))
            }else{
                <Navigate to='/login' />
                localStorage.clear()
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            localStorage.clear()
        }
    } 

    useEffect(()=>{
        if (!user) {
            getUser()
        }
    },[user])

    if (localStorage.getItem("token")) {
        return children
    } else {
        return <Navigate to='/login' />
        localStorage={}
    }
}

export default ProtectedRoute