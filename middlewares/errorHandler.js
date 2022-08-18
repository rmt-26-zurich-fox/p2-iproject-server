const errorHandler = (error, request, response, next) => {
  response.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandler;
