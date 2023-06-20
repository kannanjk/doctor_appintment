const express = require('express');
const morgan = require('morgan')
const colors = require('colors');
const db = require('./Config/Db');
const userRout =require('./Routs/UserRout')

require('dotenv').config()   

var app = express();
  
app.use(express.json())
app.use(morgan('dev')) 

db() 
    .then(() => {
      // callback();
      console.log('db connected'.bgMagenta);
    })   
    .catch((error) => {
      console.error(`Error: ${error.message}`.red.underline.bold);
      process.exit(1);
    });

    app.use('/user', userRout)

app.listen(process.env.PORT, function () {
    console.log(` app listening in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})