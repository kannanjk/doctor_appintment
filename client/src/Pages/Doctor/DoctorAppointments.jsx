import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut'
import { Table, message } from 'antd'
import dayjs from 'dayjs';
import axios from 'axios';

function DoctorAppointments() {
    const [appointments, setAppointments] = useState([])
    console.log(appointments);
    const getAppointMents = async () => {
        try {
            const res = await axios.get('doctor/doctorappointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointMents()
    })

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('doctor/updateStatus',
                { appointmentsId: record._id, status },
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            if (res.data.success) {
                message.success(res.data.message)
                getAppointMents()
            }
        } catch (error) {
            console.log(error);
            message.error("Somthing Went ERROR")
        }
    }

    const colums = [
        {
            title: "Id",
            dataIndex: '_id'
        },
        {
            title: "Date & Time ",
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {dayjs(record.date).format("DD-MM-YYYY")}&nbsp;
                    {dayjs(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Action",
            dataIndex: 'action',
            render: (text, record) => (
                <div className='d-flex'>
                    {
                        record.status === "pending" 
                            ?
                            <div className='d-flex'>
                                <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')}>Approved</button>
                            </div>
                            :  record.status === "approved" ? 
                            <div className='d-flex'>
                                <button className='btn btn-danger' onClick={() => handleStatus(record, 'reject')}>Reject</button>
                            </div>
                            : record.status === "reject" ? <div className='d-flex'>
                            <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')}>Approved</button>
                        </div>:null
                            
                    }
                </div>
            ) 
        }
    ]
    return (
        <LayOut>
            <h1>Appointments</h1>
            <Table columns={colums} dataSource={appointments} />
        </LayOut>
    )
}

export default DoctorAppointments