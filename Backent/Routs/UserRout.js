const express = require('express')
const { login, register, authControler, applyDoctor, getAllNotification, deleteAllNotification, getAllDoctors, bookAppointment, bookingAvailable, userAppointments } = require('../Controllers/UserCtrl')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const app = express()

app.post('/login', login)

app.post('/register', register)

app.post('/getUseData', AuthMiddleware, authControler)

app.post('/doctor-apply', AuthMiddleware, applyDoctor)

app.post('/get-all-notification', AuthMiddleware, getAllNotification)

app.post('/delete-all-notification', AuthMiddleware, deleteAllNotification)

app.get('/getAllDoctors', getAllDoctors)

app.post('/book-appointment', AuthMiddleware, bookAppointment)

app.post('/booking-available', AuthMiddleware, bookingAvailable)

app.get('/userAppointments',AuthMiddleware, userAppointments)

module.exports = app 