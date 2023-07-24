import React, { useEffect, useState } from 'react'
import LayOut from '../Components/LayOut'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../Redux/Features/AlertSlice'

function BookingPage() {
    const params = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [doctors, setDoctors] = useState()

    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [isAvailable, setAvailable] = useState()
    // Login user data
    const getUserData = async () => {
        try {
            const res = await axios.post('/doctor/getDoctorById', {
                doctorId: params.doctorId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleBooking = async () => {
        try {
            setAvailable(true)
            if (!date && !time) {
                return alert('Date & Time Require')
            }
            dispatch(showLoading())
            const res = await axios.post('/user/book-appointment', {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctors,
                userInfo: user,
                date: date,
                time: time
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    const handleAvailablity = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/booking-available',
                { doctorId: params.doctorId, date, time },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (res.data.success) {
                setAvailable(true)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    return (
        <LayOut>
            <h3>BookingPage</h3>
            <div className="container m-2">
                {
                    doctors && (
                        <div>
                            <h4> Dr. {doctors.firstName} {doctors.lastName} </h4>
                            <h4> Fees {doctors.feesPreCunsaltaion} {doctors.lastName} </h4>
                            <h4> Timings {doctors.timings[0]} - {doctors.timings[1]} </h4>
                            <div className="d-flex flex-column w-50">
                                <DatePicker
                                    className='m-2'
                                    format='DD-MM-YYYY'
                                    onChange={(value) => {
                                        setDate(dayjs(value).format('DD-MM-YYYY'))
                                    }
                                    }
                                />
                                <TimePicker
                                    format="HH:mm"
                                    className='m-2'
                                    onChange={(value) => {
                                        setTime(dayjs(value).format('HH:mm'))
                                    }
                                    }
                                />
                                <button className='btn btn-primary mt-2' onClick={handleAvailablity}>Check Availability</button>
                                <button className='btn btn-dark mt-2 ' onClick={handleBooking}>Book Now</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </LayOut>
    )
}

export default BookingPage