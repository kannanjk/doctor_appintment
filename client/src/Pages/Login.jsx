import { Form, Input, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {showLoading,hideLoading} from '../Redux/Features/AlertSlice.js'

function Login() {

  const Dispatch  = useDispatch()
  const navigate = useNavigate()
  const onFinishHandler = async (value) => {
    try {
      Dispatch(showLoading())
      const res = await axios.post('/user/login', value)
      window.location.reload()
      Dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success("Login success")
        navigate('/')
      } else {
        message.error("user not found")
      }
    } catch (error) {
      Dispatch(hideLoading())
      console.log(error);
      message.error("Someting wrong")
    }
  }

  return (
    <>
      <div className="form-container">
        <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
          <h3 className='text-center'>Login</h3>
          <FormItem label='email' name='email'>
            <Input type='email' required />
          </FormItem>
          <FormItem label='Password' name='Password'>
            <Input type='password' required />
          </FormItem>
          <Link to='/register' className='ms-2'>User Not Found</Link>
          <button className='btn btn-primary' type='submit'>Register</button>
        </Form>
      </div>
    </>
  )
}

export default Login