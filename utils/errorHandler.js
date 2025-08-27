class ErrorHandler extends Error{
    constructor(msg,sts){
        super(msg)
        this.statusCode = sts;
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = ErrorHandler