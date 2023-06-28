import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LayOut from '../Components/LayOut';
import DoctorList from '../Components/DoctorList';
import { Row } from 'antd';

function HomePage() {
  const [doctors, setDoctors] = useState([])
  // Login user data
  const getUserData = async () => {
    try {
      const res = await axios.get('/user/getAllDoctors', {}, {
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
    <div>
      <LayOut>
        <h1 className='text-center'>Home Page</h1>
        <Row>
          {doctors && doctors.map(doctor => (
            <DoctorList doctor={doctor} />
          ))}
        </Row>
      </LayOut>
    </div>
  )
}

export default HomePage