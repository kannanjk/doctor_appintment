const express = require('express')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const { getallUsers, getAllDoctors, changeAccountstatus } = require('../Controllers/AdminCtrl')

const route = express()

route.get('/get-users',AuthMiddleware,getallUsers)

route.get('/get-all-doctors',AuthMiddleware,getAllDoctors)

route.post('/update-user-status',AuthMiddleware,changeAccountstatus)

module.exports=route