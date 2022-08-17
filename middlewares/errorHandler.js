const errorHandler = (error, request, response, next) => {
  console.log(error);
  response.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorHandler;
