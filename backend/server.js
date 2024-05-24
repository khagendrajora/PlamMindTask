const express = require('express')
const app = express()
require('dotenv').config()
require('./db/connection')
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());


const port = 5000


app.use(bodyParser.json())

const userRegister = require('./Routes/userRoute')
app.use('/api', userRegister)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})