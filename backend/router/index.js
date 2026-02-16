
const express = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { z } = require("zod");
const { JWT_SECRET } = require("../config ");
const userRouter = express.Router();



userRouter.post("/signin",async (req, res) => {
   try {
     const { username , password , firstName , lastName } = req.body;
 
     const user = await User.create({
         username: username, 
         password : password, 
         firstName : firstName, 
         lastName : lastName,
     }); 
 
     res.status(201).json(user);
 
   } catch (error) {
     res.status(500).json({
        message: error.message
     })
   }

});


const signupSchema = z.object({
    username : z.string(), 
    password : z.string(), 
});

userRouter.post("/signup", (req, res) => {
   try{
    const body = signupSchema.safeParse(req.body);
    const user = User.findOne({
        username : body.username
    })

    if(user){
        const token = jwt.sign({
            id : user._id   
        }, JWT_SECRET)
        
        res.json({
            token : token, 
            message : "User Created Succesfully"
        })
    }else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
   }catch(error){
    console.log(error.message)
   }
});


module.exports = {
    userRouter
}; 