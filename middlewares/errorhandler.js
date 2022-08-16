const errorHandler = async (error, req, res, next) => {
  console.log(error);
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    res.status(400).json({
      message: error.errors[0].message,
    });
  } else if (error.name === "Invalid email/password") {
    res.status(401).json({
      message: "Not Authorized",
    });
  } else if (error.name === "NoToken") {
    res.status(401).json({ message: "Please login first" });
  } else if (
    error.name === "Unauthorized" ||
    error.name === "JsonWebTokenError"
  ) {
    res.status(401).json({ message: "Invalid Token" });
  } else if (error.name === "Forbidden") {
    res.status(403).json({ message: "Forbidden" });
  } else if (error.name === "NotFound") {
    res.status(404).json({ message: "Data not found" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
