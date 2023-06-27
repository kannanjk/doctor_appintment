import React from 'react'
import LayOut from '../Components/LayOut'
import { Tabs, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../Redux/Features/AlertSlice'
import axios, { } from 'axios'
import { useNavigate } from 'react-router-dom'

function NotificationPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/get-all-notification', { userId: user._id }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went wrong")
        }
    }
    const handleDeleteAllRead =async (req,res) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/user/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error("Something went error")
        }
     }
    return (
        <LayOut>
            <h1 className='p-3 text-center'>NotificationPage</h1>
            <Tabs>
                <Tabs.TabPane tab='Unread' key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map((notificationMSG) => (
                            <div className='card' onClick={notificationMSG.onclickPath}>
                                <div className='card-text' onClick={() => navigate(notificationMSG.onclickPath)}> {notificationMSG.message} </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seenNotification.map((notificationMSG) => (
                            <div className='card' onClick={notificationMSG.onclickPath}>
                                <div className='card-text'> {notificationMSG.message} </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </LayOut>
    )
}

export default NotificationPage