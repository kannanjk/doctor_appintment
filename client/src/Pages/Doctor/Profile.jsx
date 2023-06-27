import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut'
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { } from 'axios'
import { hideLoading, showLoading } from '../../Redux/Features/AlertSlice'
import dayjs, { } from 'dayjs'

function Profile() {

    const { user } = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/doctor/update-profile', {
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
                message.success(res.data.message)
                navigate('/')
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went error")
        }
    }

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/doctor/getDoctorInfo', { userId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorInfo()
    })
    return (
        <LayOut>
            <h1>Manage Account</h1>
            {doctor && (
                <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
                    ...doctor,
                    timings: [
                        dayjs(doctor.timings[0], 'HH:mm'),
                        dayjs(doctor.timings[1], 'HH:mm')
                    ]
                }}>
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
                                <Input type='text' placeholder='Your feesPerCunsaltation'></Input>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                label='Timings'
                                name='timings'
                                required
                            >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-primary' type='submit'>Update</button>
                    </div>
                </Form>
            )}
        </LayOut>
    )
}

export default Profile