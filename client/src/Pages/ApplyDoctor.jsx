import React from 'react'
import LayOut from '../Components/LayOut'
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../Redux/Features/AlertSlice'
import axios from 'axios'
import dayjs, { } from 'dayjs'

function ApplyDoctor() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    React.lazy(() => {

    })

    // handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/doctor-apply', {
                ...values, userId: user._id,
                timings: [
                    dayjs(values.timings[0]).format('HH:mm'),
                    dayjs(values.timings[1]).format('HH:mm')
                ] 
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.success)
                navigate('/')
            } else {
                message.error(res.data.success)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went error")
        }
    }
    return (
        <LayOut>
            <h1 className='text-center'>ApplyDoctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h4 className=''>Personal Details :</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='First name'
                            name='firstName'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your name'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Last name'
                            name='lastName'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your last name'></Input>
                        </Form.Item>
                    </Col> <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Phone number'
                            name='phone'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your phone number'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label=' email'
                            name='email'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your email'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='website'
                            name='website'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your website'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Address'
                            name='address'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your address'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className=''>Professional Details :</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label=' specialzation'
                            name='specialzation'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your specialzation'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='exprerience'
                            name='exprerience'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Your exprerience'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='feesPerCunsaltation'
                            name='feesPreCunsaltaion'
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='number' placeholder='Your feesPerCunsaltation'></Input>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Timings'
                            name='timings'
                            required
                            rules={[{ required: true }]}
                        >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </Form>
        </LayOut>
    )
}

export default ApplyDoctor