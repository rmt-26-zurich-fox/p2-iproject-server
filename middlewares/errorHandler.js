const errorHandler = (error, req, res, next) => {
  if (error.name === "Data not found") {
    res.status(404).json({ message: error.name });
  } else {
    req.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
