const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config ");

async function middleware(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);
    
    if(decodedData){
        req.userId = decodedData.id
        next();
    }else{
        res.json("You are not signed in");
    }
}


module.exports = {
    middleware
}