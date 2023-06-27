const express =require('express')
const { login, register, authControler, applyDoctor, getAllNotification, deleteAllNotification, getAllDoctors } = require('../Controllers/UserCtrl')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const app = express() 
 
app.post('/login',login)

app.post('/register',register)

app.post('/getUseData',AuthMiddleware,authControler)

app.post('/doctor-apply',AuthMiddleware,applyDoctor)

app.post('/get-all-notification',AuthMiddleware,getAllNotification)

app.post('/delete-all-notification',AuthMiddleware,deleteAllNotification)

app.get('/getAllDoctors',getAllDoctors)
 
module.exports =app 