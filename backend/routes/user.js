const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const { z } = require("zod");
const { userModel, accountModel } = require("../db");
const { middleware } = require("../middleware");

const signupSchema = z.object({
    username : z.string(), 
    password : z.string(), 
    firstName : z.string(), 
    lastName: z.string()
})

userRouter.post("/signup",async (req, res ) => {
    try {
        const body = signupSchema.safeParse(req.body);
        
    
        //If not then create the user
        const user = await userModel.create({
            username : body.data.username, 
            password : body.data.password, 
            firstName : body.data.firstName, 
            lastName : body.data.lastName
        }); 
    
        if(!user){
            res.status(403).json({
                msg : "Email already taken / Incorrect inputs"
            })
        }
    
        //Also create the User Account
        const userId = user._id;
        await accountModel.create({
            userId, 
            balance : 1 + Math.random() * 100000
        })
    
        const token = jwt.sign({
            userId: userId,
            firstName: body.data.firstName,
            lastName: body.data.lastName
        }, process.env.JWT_SECRET)

        res.json({
            message: "User created Successfully",
            token : token 
        })
    } catch (error) {
        console.error();

    }

})


const loginSchema = z.object({
     username : z.string(), 
    password : z.string(),
});

//For login
userRouter.post("/signin", async (req, res ) => {
    try {
        const body = loginSchema.safeParse(req.body);
        const user = await userModel.findOne({
            username: body.data.username
        })
        if(!user){
            return res.status(403).json({
                msg: "Invalid Credentials"
            })
        }else {
            const token = jwt.sign({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName
            }, process.env.JWT_SECRET);
    
            return res.status(201).send({
                message: "User login Successfully", 
                token : token
            })
        }
    } catch (error) {
        console.error(error);
    }
})


const updateSchema = z.object({
    password : z.string(), 
    firstName: z.string(), 
    lastName: z.string()
})
//To Update the User Details
userRouter.put("/", middleware, async (req, res)=> {
    const body = updateSchema.safeParse(req.body);

    await userModel.updateOne({
        _id: req.userId
    }, {
        $set : req.body
    })

    res.json({
        msg: "Updated Succesfully"
    })
})

//Just to get the User by anyone
userRouter.get("/bulk",middleware, async (req, res ) => {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or : [{
            firstName : {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    }); 

    res.json({
        user: users.map( user => ({
            username : user.username, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            _id: user._id
        }))
    })

})

module.exports = {
    userRouter
}