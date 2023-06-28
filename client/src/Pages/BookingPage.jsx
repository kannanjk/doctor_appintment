import React, { useEffect, useState } from 'react'
import LayOut from '../Components/LayOut'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

function BookingPage() {
    const params = useParams()
    const [doctors, setDoctors] = useState()
  
    const [date, setDate] = useState()
    const [timings, setTimings] = useState()
    // const [isAvailable, setAvailable] = useState()
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
                                    onChange={(value) =>
                                        setDate(dayjs(value).format('DD-MM-YYYY'))}
                                />
                                <TimePicker.RangePicker
                                    format="HH:mm"
                                    className='m-2'
                                    onChange={(values) => setTimings([
                                        dayjs(doctors.timings[0], 'HH:mm'),
                                        dayjs(doctors.timings[1], 'HH:mm'),
                                    ])} 
                                />
                                <button className='btn btn-primary'>Check Availability</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </LayOut>
    )
}

export default BookingPage