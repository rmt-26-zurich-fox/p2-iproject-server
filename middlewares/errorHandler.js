const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "emptyPassword") {
    res.status(400).json({ message: `Password is required` });
  } else if (err.name === "emptyEmail") {
    res.status(400).json({ message: `Email is required` });
  } else if (err.name === "invalid_email/password") {
    res.status(401).json({ message: `Invalid email/password` });
  } else if (err.name === "notLoggedIn") {
    res.status(401).json({ message: `Please login to access app features` });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: `Invalid Token` });
  } else if (err.name === "invalid_email/password") {
    res.status(401).json({ message: "Invalid email/password" });
  } else if (err.name === "unauthorized") {
    res.status(403).json({ message: "You are not authorized" });
  } else if (err.name === "explicitThread") {
    res
      .status(403)
      .json({ message: "You are not authorized to access explicit thread" });
  } else if (err.name === "profileNotFound") {
    res.status(404).json({ message: "Profile not found" });
  } else if (err.name === "threadNotFound") {
    res.status(404).json({ message: "Thread not found" });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = errorHandler;
