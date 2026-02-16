require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require('./router');

const app = express();

app.use(express.json())

app.use("/api/v1/",userRouter );



async function main(){
   try {
     await mongoose.connect(process.env.DB_URL);
     console.log("Db Connected");

     app.listen(3000, ()=> console.log("Server is running on the port 3000"))
   } catch (error) {
    console.log("Error while connecting the Server",error.message)
   }
}

main();
