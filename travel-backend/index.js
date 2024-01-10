// load .env file
require('dotenv').config()
// Import express
const express=require('express')
// import cors
const cors= require('cors')
// import router
const router= require('./Router/routes')
// import DB

const db=require('./DB/connection')
const appMiddleware = require('./Middlewares/appMiddleware')

// create an application using express
const tbServer=express()
// use corse Middlewaere
tbServer.use(cors())
// to convert data into json format
tbServer.use(express.json())
tbServer.use(appMiddleware)

tbServer.use(router)
tbServer.use('/uploads',express.static('./uploads'))


// define Port

const PORT =5000||process.env.PORT

tbServer.listen((PORT),(req,res)=>{
    console.log("Listening to the port" +PORT);
})
// http get resolving  to  "http://localhost:000")

tbServer.get('/',(req,res)=>{
    res.send("Travel Blog Server Strarted");
})

tbServer.post('/', (req, res) => {
    res.send("post method");
})
