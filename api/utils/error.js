export const errorHandler = (errorCode, errorMessage) => {
    const error = new Error()
    error.statusCode = errorCode
    error.message = errorMessage
    return error;
}