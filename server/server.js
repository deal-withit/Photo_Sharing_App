const dotenv = require("dotenv")
const mongoose = require('mongoose')
const express = require('express'); 
const app = express(); 
const cookieParser = require('cookie-parser'); 

app.use(cookieParser()); 

dotenv.config({ path: './config.env'});
require('./db/conn')
//const User = require('./models/userSchema')

//To understand json data
app.use(express.json());

//connecting routes 
app.use(require('./routes/auth'))

const PORT = process.env.PORT;


//Server is listening to the port. 
app.listen(PORT, () => {
    console.log(`Server Running at : localhost: ${PORT}`); 
})

module.exports = app; 