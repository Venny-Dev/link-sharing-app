class AppError extends Error {
  constructor(message, statusCode) {
    // When we extend a parent call, we call the super function to get the parent constuctor function
    super(message);

    console.log(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
