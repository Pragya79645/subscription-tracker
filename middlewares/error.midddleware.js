const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;

        console.error(err);
//bad obj id
        if (err.name === 'CastError') {
            const message = `Resource not found.`;

            error = new Error(message);
            error.statusCode = 404;
        }
         //duplicate key
       if(err.code===11000) {
        const message = 'Duplicate field value entered.';
        error= new Error(message);
        error.statusCode=400;
       }
 //validation error
       if(err.name==='ValidationError') {
        const message=Object.values(err.errors).map(val=>val.message);
        error.statusCode=400;
        error=new Error(message);
       }

       res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
       });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;