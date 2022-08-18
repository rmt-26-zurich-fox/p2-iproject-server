function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.name == "Token not Found") {
    res.status(401).json({ message: "Please Login" });
  } else if (err.name == "Unauthorized" || err.name == "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token" });
  } else if (err.name == "Forbidden") {
    res.status(403).json({ message: "Forbidden" });
  } else if (
    err.name == "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    res.status(404).json({ message: err.errors[0].message });
  } else if (err.name == "News not Found") {
    res.status(404).json({ message: "News not Found" });
  } else if (err.name == "Invalid email/password") {
    res.status(404).json({ message: "Invalid email/password" });
  } else if (err.name == "NotFound") {
    res.status(404).json({ message: "News not found" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
