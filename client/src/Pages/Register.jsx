import React from 'react'
import { Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import '../Styles/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/Features/AlertSlice.js'

function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //form Handler
    const onFinishHandler = async (value) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/register', value)
            dispatch(hideLoading())
            if (res.data.success) {
                message.success("user register success")
                navigate('/')
            } else {
                message.error("user alredy exist!")
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('SomeThing went error')
        }
    }

    return (
        <>
            <div className="form-container">
                <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                    <h3 className='text-center'>Register</h3>
                    <FormItem label='Name' name='name' >
                        <Input type='text' required />
                    </FormItem>
                    <FormItem label='email' name='email'>
                        <Input type='email' required />
                    </FormItem>
                    <FormItem label='Password' name='password'>
                        <Input type='password' required />
                    </FormItem>
                    <Link to='/login' className='ms-2'>Alredy user registerd</Link>
                    <button className='btn btn-primary' type='submit'>Register</button>
                </Form>
            </div>
        </>
    )
}

export default Register