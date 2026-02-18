const { Router } = require("express"); 
const { middleware } = require("../middleware");
const { accountModel } = require("../db");
const { default: mongoose }  = require("mongoose"); 
const accountRouter = Router();

accountRouter.get("/balance", middleware,async (req, res ) => {
    const balance = await accountModel.findOne({
        userId : req.userId
    }); 

    if(!balance){
        return res.status(401).json({
            msg: "No Account Found."
        })
    }

    res.json({
        balance : balance.balance
    })
})


accountRouter.post("/transfer", middleware , async (req, res ) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;

    //Fetch the accounts within the transactions
    const account = await accountModel.findOne({ userId : req.userId }).session(session)
    if(!account || account < amount ){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    };

    const toAccount = await accountModel.findOne({ userId : to}).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //Perform the transfer
    await accountModel.updateOne({userId : req.userId }, {$inc : {balance : -amount }}).session(session);
    await accountModel.updateOne({userId : to }, { $inc : {balance : amount}}).session(session);

    //Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
})

module.exports = {
    accountRouter
}