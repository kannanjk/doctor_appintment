import React from 'react'
import '../Styles/LayOut.css'
import { adminMenu, userMenu } from '../Data/Data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Badge, message } from 'antd'

function LayOut({ children }) {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const location = useLocation()

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Appointment',
            path: '/appointment',
            icon: 'fa-solid fa-bars'
        },
        {
            name: 'Profile',
            path: `/profile/${user?._id}`,
            icon: 'fa-regular fa-user'
        },
    ]
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Appointment',
            path: '/appointment',
            icon: 'fa-solid fa-bars'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'fa-solid fa-user-doctor'
        },
        {
            name: 'Profile',
            path: `/profile/${user?._id}`,
            icon: 'fa-regular fa-user'
        },
    ]


    const sideBarMenu = user?.isAdmin
        ? adminMenu
        : user?.isDoctor
            ? doctorMenu
            : userMenu


    const logout = () => {
        localStorage.clear()
        message.success("Logout success")
        navigate('/login')
    }
    return (
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6>Doc App</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {
                            sideBarMenu.map(menu => {
                                const isActive = location.pathname === menu.path
                                return (
                                    <>
                                        <div className={`menu-item ${isActive && `active`}`}>
                                            <i className={menu.icon} ></i>
                                            <Link to={menu.path}> {menu.name} </Link>
                                        </div>
                                    </>
                                )
                            })
                        }

                        <div className={`menu-item `} onClick={logout}>
                            <i className='fa-solid fa-arrow-right-from-bracket' ></i>
                            <Link to='/login'> Logout </Link>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        <div className="header-content" style={{ cursor: 'pointer' }}>
                            <Badge
                                count={user && user.notification.length}
                                onClick={() => {
                                    navigate('/notification')
                                }}
                            >
                                <i class="fa-solid fa-bell" ></i>
                            </Badge>
                            <Link to={`/profile/${user?._id}`} > {user?.name} </Link>
                        </div>
                    </div>
                    <div className="body"> {children} </div>
                </div>
            </div>
        </div>
    )
}

export default LayOut