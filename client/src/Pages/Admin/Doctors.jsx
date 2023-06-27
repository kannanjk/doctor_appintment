import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut'
import axios, { } from 'axios'
import { Table, message } from 'antd';

function Doctors() {
  const [doctors, setdoctors] = useState([])
  console.log(doctors);

  const getDoctors = async () => {
    try {
      const res = await axios.get('/admin/get-all-doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setdoctors(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccountstatus =async(record,status)=>{
    try {
      const res = await axios.post('/admin/update-user-status',{doctorId:record._id,userId:record.userId,status:status},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        message.success(res.data.message)
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      message.error("somthing went Wrong")
    }                      
  }

  useEffect(() => {
    getDoctors()
  }, [])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span> {record.firstName} {record.lastName} </span>
      )
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {
            record.status === "pending" ? (
              <button className='btn btn-primary' onClick={() => handleAccountstatus(record,'approved')}>Approve</button>
            ) : (
              <button className='btn btn-danger'>Reject</button>
            )
          }
        </div>
      )
    }
  ]
  return (
    <LayOut>
      <h1>Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </LayOut>
  )
}

export default Doctors 