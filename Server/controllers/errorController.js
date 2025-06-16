const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"([^"]*)"/g)[0];
  // console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(
    (value) => value.properties.message
  );
  const message = `Invalid input data  ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again", 401);

const sendErrorProd = (error, res) => {
  // Operational error, trusted. Send message to the client
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });

    // Programming or other unknown error: Dont leak error details
  } else {
    // 1) Log error
    console.error("ERROR ", error);

    //  2) Sen generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = (error, req, res, next) => {
  console.log(error);
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === "production") {
    // console.log(error);
    let err = error;

    // Throw this when there is no matching id
    if (error.name === "CastError") err = handleCastErrorDB(error);

    // Throw this for duplicate fields
    if (error.code === 11000) err = handleDuplicateFieldsDB(error);

    // Throw this for validation error
    if (error.name === "ValidationError") err = handleValidationErrorDB(error);

    // Thow error for manipulated jwt
    if (error.name === "JsonWebTokenError") err = handleJWTError();

    // Throw error for expired jwt
    if (error.name === "TokenExpiredError") err = handleJWTExpiredError();
    // So at this point the error has been manipulated and it has isOperational propery on it
    sendErrorProd(err, res);
  }
};
