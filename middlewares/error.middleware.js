const errorMiddleware = (err, req, res, next) => {
try{
    let error = {...err}
    error.message = err.message;
    console.error(err);

    //mongoose bad object id error
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new Error(message);
        error.statusCode = 404;
    }

    //mongoose duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate field value entered: ${Object.keys(err.keyValue)[0]}`;
        error = new Error(message);
        error.statusCode = 400;
    }

    //mongoose validation error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new Error(message);
        error.statusCode = 400;
    }

    //mongoose json web token error
    if(err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try again';
        error = new Error(message);
        error.statusCode = 401;
    }

    //mongoose token expired error
    if(err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token has expired. Try again';
        error = new Error(message);
        error.statusCode = 401;
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
    });

}catch (error){
    next(error);
}
}