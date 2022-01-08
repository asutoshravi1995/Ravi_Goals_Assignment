const bodyParser = require('body-parser')
const express=require('express')
const RequestLogger=require('./utilities/requestLogger')
const ErrorLogger=require('./utilities/errorLogger')
const router=require('./routes/routing')
const app=express()
const port= process.env.PORT ||3000

app.use(bodyParser.json())
app.use(RequestLogger)
app.use(router)
app.use(ErrorLogger)

app.listen(port,()=>{console.log(`Server running at ${port}`);});


