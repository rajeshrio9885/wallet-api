const Transaction = require("../model/TranscationModel")

exports.getTransactionByUserId = async(id)=>{
    return await Transaction.find({user_id : id}).sort({created_At:-1})
}

exports.deleteTransactionById = async(id)=>{
    return await Transaction.findByIdAndDelete(id)
}