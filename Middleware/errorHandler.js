const {constants}=require('../constants');
const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500

    switch(statusCode)
    {
        case constants.NOT_FOUND:
            res.json({title: "Not Found",
                    message: err.message, 
                    stackTrace: err.stack});
        case constants.VALIDATIONERROR:
            res.json({title: "Validation Error",
                    message: err.message, 
                    stackTrace: err.stack});
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized user",
                    message: err.message, 
                    stackTrace: err.stack});
        case constants.FORBIDDEN:
            res.json({title: "FORBIDDEN",
                    message: err.message, 
                    stackTrace: err.stack});
        case constants.SERVER_ERROR:
            res.json({title: "Server Error",
                    message: err.message, 
                    stackTrace: err.stack});
        default:
            console.log("No Error");
            break;
    }
};

module.exports = errorHandler;