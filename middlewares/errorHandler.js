function errorHandler(error, req, res, next) {
    console.log(error)
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: error.errors[0].message
        })
    }
    else if (error.name === "No Token") {
        res.status(401).json({
            message: "Please Login"
        })
    }
    else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: "Invalid token"
        })
    }
    else if (error.name === "INVALID_EMAIL_PASSWORD") {
        res.status(401).json({
            message: "error invalid username or email or password"
        })
    }
    else if (error.name === "Forbidden") {
        res.status(403).json({
            message: "do not have permission"
        })
    }
    else if (error.name === "Not found") {
        res.status(404).json({
            message: "Data not found"
        })
    }
    else if (error.name === "Item already added") {
        res.status(409).json({
            message: "Item already added"
        })
    }
    else {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = errorHandler