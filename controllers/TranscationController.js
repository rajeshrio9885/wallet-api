const catchAsyncErr = require("../middleware/AsyncErrorHandler");
const Transaction = require("../model/TranscationModel");
const { getTransactionByUserId, deleteTransactionById } = require("../services/transactionServices");
const _ = require("underscore")
const ErrorHandler = require("../utils/errorHandler")

const addTransaction = catchAsyncErr(async(req,res,next) =>{
    const {title,amount,category,user_id} = req.body

    if(!title || !amount || !category || !user_id){
        return next(new ErrorHandler("All fields are required"));
    }

    let transcation = new Transaction()
    transcation.title = title;
    transcation.amount = amount;
    transcation.category = category;
    transcation.user_id = user_id;
    await transcation.save();

    res.status(201).json({
        sucess : true,
        transcation
    });
})

const getTransactionById = catchAsyncErr(async(req,res,next)=>{
    const {userId} = req.params

    if(!userId){
        return next(new ErrorHandler("user id not found",404))
    }

    const transcations = await getTransactionByUserId(userId)

    res.status(200).json({
        sucess : true,
        transcations
    })
})

const deleteTransaction = catchAsyncErr(async(req,res,next)=>{
    const {id} = req.params;

    const isDeleted = await deleteTransactionById(id)

    if(!isDeleted){
        return next(new ErrorHandler("Transaction Id not found",404))
    }

    res.status(200).json({
        sucess : true,
        message : "Transaction deleted sucessfully"
    })
})

const getTransactionSummary = catchAsyncErr(async(req,res,next)=>{
    const {userId} = req.params;
    const transcation = await getTransactionByUserId(userId)
    const summary = {expense : 0,income:0}
    const grpByCat = _.groupBy(transcation,"category")
    for(let category in grpByCat){
        if(category=="expense"){
            grpByCat[category].forEach((x)=>{
                summary.expense += Number(x.amount);
            })
        }else{
            grpByCat[category].forEach((x)=>{
                summary.income += Number(x.amount);
            })
        }
    }
    summary.total = summary.income + summary.expense
    res.status(200).json(summary)
})

module.exports = {addTransaction,getTransactionById,deleteTransaction,getTransactionSummary}