import React, { useEffect, useState } from 'react'
import LayOut from '../Components/LayOut'
import axios, { } from 'axios'
import dayjs, { } from 'dayjs'
import { Table } from 'antd'
import  moment from 'moment'

function Appointments() {

    const [appointments, setAppointments] = useState([])
    console.log(appointments);
    const getAppointMents = async () => {
        try {
            const res = await axios.get('user/userAppointments', {
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

    const colums = [
        {
            title: "Id",
            dataIndex: '_id'
        },
        // {
        //     title: "Name",
        //     dataIndex: 'name',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorInfo.firstName}, {record.doctorInfo.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title: "Phone",
        //     dataIndex: 'phone',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorInfo.phone}
        //         </span>
        //     )
        // },
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
            title:"Status",
            dataIndex:"status",
        }
    ]

    return (
        <LayOut>
            <h1>Appointments</h1>
            <Table columns={colums} dataSource={appointments}/>
        </LayOut>
    )
}

export default Appointments