const express = require('express')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const { getDoctorInfo, updateProfile, getDoctorById, doctorappointment, updateStatus } = require('../Controllers/DoctorCtrl')

const app = express()

app.post('/getDoctorInfo',AuthMiddleware,getDoctorInfo)

app.post('/update-profile',AuthMiddleware,updateProfile)

app.post('/getDoctorById',AuthMiddleware,getDoctorById)

app.get('/doctorappointments',AuthMiddleware,doctorappointment)

app.post('/updateStatus',AuthMiddleware,updateStatus)

module.exports= app