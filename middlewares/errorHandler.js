const errorHandler = (err, req, res, next) => {
  let status;
  let message;
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "UniqueFavourite") {
    status = 400;
    message = "You have been like this doctor";
  } else if (
    err.name === "invalid_email/password" ||
    err.name === "JsonWebTokenError"
  ) {
    status = 401;
    message = "Invalid Email or Password";
  } else if (err.name === "token_notExists") {
    status = 401;
    message = "Please Login";
  } else if (err.name === "Forbidden") {
    status = 403;
    message = "Forbidden";
  } else if (err.name === "NotFound") {
    status = 404;
    message = "Favourite not found";
  } else {
    status = 500;
    message = "Internal Server Error";
  }
  console.log(err);
  res.status(status).json({ message });
};

module.exports = errorHandler;
