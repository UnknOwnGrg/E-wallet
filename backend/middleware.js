const express = require("express");
const jwt = require("jsonwebtoken");


async function middleware(req, res , next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.JWT_SECRET);

    if(decodedData){
        req.userId = decodedData.id
        next(); 
    }else {
        res.status(503).json({
            msg: "Invalid Credentials"
        })
    }
}

module.exports = {
    middleware
}