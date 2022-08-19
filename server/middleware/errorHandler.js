const errorHandler = (err, req, res, next) => {
  if (err.name === "SequelizeValidationError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({ message: err.errors[0].message });
  } else if (err.name === "Login fail") {
    res.status(401).json({ message: "Invalid email/password" });
  } else if (err.name === "Not found") {
    res.status(404).json({ message: "Hero not found" });
  } else if (err.name === "Token Invalid") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (err.name === "Unauthorized") {
    res.status(403).json({ message: "You are not authorized" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
