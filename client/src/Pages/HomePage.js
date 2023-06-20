import React, { useEffect } from 'react'
import axios from 'axios' 

function HomePage() {
  // Login user data
  const getUserData = async () => {
    try {  
      const getToken =  localStorage.getItem("token")
        
      const getAuthorizationHeader = () => `Bearer ${getToken}`;
      const axiosInstance = await axios.post('/user/getUseData',{},{
        headers: { Authorization: getAuthorizationHeader() },
      }); 
      console.log(axiosInstance);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default HomePage