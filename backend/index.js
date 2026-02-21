require('dotenv').config()
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require('./routes/user');
const { accountRouter } = require('./routes/account');

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/v1/user", userRouter); 
app.use("/api/v1/account", accountRouter);

async function main(){
    try{
    const connection = await mongoose.connect(process.env.DB_URL);

    if(!connection){
        res.status(403).json({
            message: "Invalid Connection String"
        })
    }
    console.log("Database connected");
    
    app.listen(process.env.PORT, ()=> "Port is running on 3000")
    }catch(error){
        console.error();
        res.status(501).json({
            message: "error while connecting to the Server"
        })
    }
    
}

main();