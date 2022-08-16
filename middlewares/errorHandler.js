const errorHandler = async (err, req, res, next) => {
  console.log(err);
  function errTemplate(status, msg) {
    res.status(status).json({ message: msg });
  }

  if (err.name === "SequelizeValidationError")
    return errTemplate(400, err.errors[0].message);

  const errData = err.response.data;
  if (errData) {
    const status_code = errData.status_code;
    const status_message = errData.status_message;
    if (status_code === 22) return errTemplate(400, status_message);
  }

  errTemplate(500, "Internal server error");
};

module.exports = errorHandler;
