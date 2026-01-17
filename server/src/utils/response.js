//utils/response.js
    const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
    };


    const sendError = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message,
    });
    };

    module.exports = { sendSuccess, sendError };