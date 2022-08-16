let errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: error.errors[0].message
        })
    } else if (error.name === "NoToken") {
        res.status(401).json({
            message: `Please login first`
        })
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: `Invalid Token`
        })
    } else if (error.name === `Forbidden`) {
        res.status(403).json({
            message: `This is not your movie`
        })
    } else if (error.name === `ForbiddenStatus`) {
        res.status(403).json({
            message: `You are not the admin`
        })
    }else if (error.name === `ForbiddenRole`) {
        res.status(403).json({
            message: `You are not the customer`
        })
    }else if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeForeignKeyConstraintError") {
        res.status(400).json({
            message: error.errors[0].message
        })
    } else if (error.name === `Invalid email or password`) {
        res.status(404).json({
            message: `User not found, invalid email or password`
        })
    } else if (error.name === `notFound`) {
        res.status(404).json({
            message: `Not found`
        })
    } else if (error.name === `MovieNotFound`) {
        res.status(404).json({
            message: `Movie not found`
        })
    }else if (error.name === `already`) {
        res.status(404).json({
            message: `This movie is already in your bookmarks`
        })
    } else {
        console.log(error);
        res.status(500).json({
            message: `Internal server error`
        })
    }
}

module.exports = errorHandler