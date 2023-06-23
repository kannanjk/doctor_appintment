import React, { useEffect } from 'react'
import axios from 'axios'
import LayOut from '../Components/LayOut';

function HomePage() {
  // Login user data
  const getUserData = async () => {
    try {
      const getToken = localStorage.getItem("token")

      const getAuthorizationHeader = () => `Bearer ${getToken}`;
      await axios.post('/user/getUseData', {}, {
        headers: { Authorization: getAuthorizationHeader() },
      });
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
        <h1>Home Page</h1>
      </LayOut>
    </div>
  )
}

export default HomePage