const express =require('express')
const { login, register, authControler } = require('../Controllers/UserCtrl')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const app = express()

app.post('/login',login)

app.post('/register',register)

app.post('/getUseData',AuthMiddleware,authControler)
 

module.exports =app 