const dotEnv = require("dotenv");
const ErrorHandler = require("../utils/errorHandler");

dotEnv.config()

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV === "development"){
        res.status(err.statusCode).json({
            sucess : false,
            message : err.message,
            stack : err.stack,
            error : err 
        })
    }else{
        let message = err.message;
        let error = new Error(message)

        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(val => val.message)[0]
            console.log("in validation "+message)
            err.statusCode = 400
            error = new ErrorHandler(message,err.statusCode)
        }

        if(err.name == "CastError" ){
            message = "Resource not Found";
            err.statusCode = 404;
            error = new ErrorHandler(message,err.statusCode)
        }

        res.status(err.statusCode).json({
            sucess : false,
            message : error.message || "Internal server error"
        })
    }
   
}