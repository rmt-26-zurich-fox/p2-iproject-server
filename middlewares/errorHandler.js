function errorHandler(err, req, res, next) {
  console.log(err, err.name);
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    let errors = err.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors });
  } else if (err.name === "SequelizeForeignKeyConstraintError") {
    res.status(400).json({ message: `Foreign Key not found` });
  } else if (err.name === "not a valid email") {
    res.status(400).json({ message: `this email is not valid email` });
  } else if (err.name === "not a valid phonenumber") {
    res
      .status(400)
      .json({ message: `this phonenumber is not valid phonenumber` });
  } else if (err.name === "duplicated") {
    res.status(400).json({ message: "Already in My Favorite" });
  } else if (err.name === "NoToken") {
    res.status(401).json({ message: "Please login first" });
  } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token" });
  } else if (err.name === "invalid_email/password") {
    res.status(401).json({ message: "Invalid email or password" });
  } else if (err.name === "Not a Customer") {
    res.status(403).json({ message: "Forbidden, Only Customer" });
  } else if (err.name === "AdminOnly") {
    res.status(403).json({ message: "Forbidden, Only Admin" });
  } else if (err.name === "Forbidden") {
    res.status(403).json({ message: "Forbidden" });
  } else if (err.name === `NotFound`) {
    res.status(404).json({ message: "Data not found" });
  } else {
    res.status(500).json({ message: `Internal Server Error` });
  }
}

module.exports = errorHandler;
