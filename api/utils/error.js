export const errorHandler = (errorCode, errorMessage) => {
    const error = new Error()
    error.statusCode = errorCode
    error.message = errorMessage
    console.log(error)
    return error;
}