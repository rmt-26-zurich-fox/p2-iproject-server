const errorHandler = (error, req, res, next) => {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    let err = error.errors.map((el) => el.message);
    let path = error.errors.map((el) => el.path);
    res.status(400).json({ message: err, path });
  } else if (error.name === "same input") {
    res.status(400).json({ message: ["Unable to update due to same input"] });
  } else if (error.name === "invalid login") {
    res.status(401).json({ message: ["Invalid email or password"] });
  } else if (
    error.name === "invalid token" ||
    error.name === "JsonWebTokenError"
  ) {
    res.status(401).json({ message: ["Invalid token"] });
  } else if (error.name === "forbidden") {
    res.status(403).json({ message: ["User unauthorized"] });
  } else if (error.name === "not found") {
    res.status(404).json({ message: ["Data not found"] });
  } else if (error.name === "invalid category") {
    res.status(404).json({ message: ["Category not exists"] });
  } else {
    res.status(500).json({ message: ["Internal server error"] });
  }
};

module.exports = errorHandler;
