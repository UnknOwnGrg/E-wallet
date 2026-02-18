const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        minLength: 3, 
        maxLength: 30
    }, password : {
        type: String,
        required: true, 
        minLength: 2  
    }, 
    firstName: {
        type : String,
        required: true, 
        maxLength: 50 
    }, 
    lastName : {
        type : String, 
        required: true, 
        trim: true, 
        maxLength: 50
    }
})

const accountSchema = new Schema({
    userId: {
        type : mongoose.Types.ObjectId,
        ref: 'User', 
        required : true 
    }, 
    balance : {
        type : Number,
        required: true
    }
})

const userModel = mongoose.model("User", userSchema); 
const accountModel = mongoose.model("Account", accountSchema);

module.exports = {
    userModel, 
    accountModel
}