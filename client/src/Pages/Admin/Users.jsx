import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut'
import axios, { } from 'axios'
import { Table } from 'antd'

function Users() {
  const [users, setUsers] = useState([])
  
  const getUsers = async () => {
    try {
      const res = await axios.get('/admin/get-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  const columns = [ 
    {
      title: 'Name',
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <span> {record.isDoctor ? 'yes' : 'no'} </span>
      )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">
            Block
          </button>
        </div>
      )
    }
  ]
  return (
    <LayOut>
      <h1 className='text-center m-2'>Users List</h1>
      <Table columns={columns} dataSource={users} />
    </LayOut>
  )
}

export default Users