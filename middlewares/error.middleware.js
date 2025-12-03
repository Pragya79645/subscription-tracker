const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // Bad object id
    if (err.name === 'CastError') {
        const message = `Resource not found.`;
        error = new Error(message);
        error.statusCode = 404;
    }

    // Duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered.';
        error = new Error(message);
        error.statusCode = 400;
    }

    // Validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error.statusCode = 400;
        error = new Error(message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error'
    });
};

export default errorMiddleware;