import ErrorResponse from "../utils/errorResponse.js";

export const errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;

    // log to console for dev
    console.log(err);


    // Invalid JSON payload
    if (err.type === 'entity.parse.failed') {
        const message = 'Invalid JSON payload passed.';
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        message: error.message || 'Server Error',
        status: 'error',
        data: null
    });
};