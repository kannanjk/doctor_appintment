const express = require('express');
const morgan = require('morgan')
const colors = require('colors');
const db = require('./Config/Db');
const userRout = require('./Routs/UserRout')
const adminRoute = require('./Routs/AdinRoute')
const doctorRoute = require('./Routs/DoctorRoute')
const path =require('path')

require('dotenv').config()

var app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./Client/build')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,"./Client/build/index.html"))
})

db()
  .then(() => {
    // callback();
    console.log('db connected'.bgMagenta);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  });


app.listen(process.env.PORT, function () {
  console.log(` app listening in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})
app.use('/user', userRout)
app.use('/admin', adminRoute)
app.use('/doctor', doctorRoute)