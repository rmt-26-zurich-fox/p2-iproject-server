const errorHandler = (err, req, res, next) => {
  if(err.name === "SequelizeValidationError"){
    res.status(400).json({
      message: err.errors.map(el => {
        return el.message
      })
    });
  } else if (err.name === "SequelizeDatabaseError"){
      res.status(400).json({
        message,
      });
  } else if (err.name === "SequelizeForeignKeyConstraintError"){
    res.status(400).json({
      message: err.errors.map(el => {
        return el.message
      })
    });
  } else if (err.name === "SequelizeUniqueConstraintError"){
    res.status(400).json({
      message: err.errors.map(el => {
        return el.message
      })
    });
  } else if (err.name === "Cannot change to same status") {
    res.status(400).json({
      message: err.name
    });
  }
   else if(err.name === "Invalid email or password"){
    res.status(401).json({
      message: err.name
    });
  } else if(err.name === "JsonWebTokenError"){
    res.status(401).json({
      message: "Invalid token"
    });
  } else if(err.name === "Unauthorized"){
    res.status(401).json({
      message: "You are not authorized"
    });
  } else if(err.name === "Forbidden"){
    res.status(403).json({
      message: "You are not authorized"
    });
  } else if(err.name === "Error not found"){
    res.status(404).json({
      message: err.name
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = errorHandler;