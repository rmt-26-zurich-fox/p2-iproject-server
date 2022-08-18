function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({
            message: "Bad Request",
            error: errors
        })
    } else if (error.code === 401) {
        res.status(401).json({
            message: "Unauthorized",
            error: error.error
        })
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Invalid Token",
            error: error.error
        })
    } else if (error.code === 403) {
        res.status(403).json({
            message: "Forbidden",
            error: error.error
        })
    } else if (error.code === 404) {
        res.status(404).json({
            message: "Data not found",
            error: error.error
        })
    } else {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = errorHandler;