import React from 'react'
import LayOut from '../Components/LayOut'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'

function NotificationPage() {
    const {user} = useSelector(state=>state.user)
    console.log(user);
    const handleMarkAllRead =()=>{}
    const handleDeleteAllRead =()=>{} 
  return (
    <LayOut>
        <h1 className='p-3 text-center'>NotificationPage</h1>
        <Tabs>
            <Tabs.TabPane tab='Unread' key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                </div>
                {
                    user?.notification.map((notificationMSG)=>(
                        <div className='card' onClick={notificationMSG.onclickPath}>
                            <div className='card-text'> {notificationMSG.message} </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2' onClick={handleDeleteAllRead}>Delete All Read</h4>
                </div>
            </Tabs.TabPane>
        </Tabs> 
    </LayOut>
  )
} 

export default NotificationPage