function errorHandler(error, req, res, next) {
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
    const errors = error.errors.map((error) => {
      return error.message;
    });
    res.status(400).json({ message: errors });
  } else if (error.name === "no file") {
    res.status(400).json({ message: `Bad request` });
  } else if (error.name === "Maximum file size is more than 255 Kb") {
    res.status(400).json({ message: "Maximum file size is 255Kb" });
  } else if (error.name === "File needs to be an image") {
    res.status(400).json({ message: "File type needs to be an image" });
  } else if (error.name === "invalid email/password") {
    res.status(401).json({ message: "Invalid email/password" });
  } else if (error.name === "NoToken") {
    res.status(401).json({ message: "Please login first" });
  } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (error.name === "Forbidden") {
    res.status(403).json({ message: "You are not authorized" });
  } else if (error.name === "NotFound") {
    res.status(404).json({ message: "Data not found" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = errorHandler;
