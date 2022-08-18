
async function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.name === "InvalidEmailOrPassword") {
        res.status(401).json({
            message: ["Invalid email or password"]
        });
    } else if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: error.errors.map(el => {
                return el.message;
            })
        });
    } else if (error.name === "NotFound") {
        res.status(404).json({
            message: ["Data not found"]
        });
    } else if (error.name === "EmailRequired") {
        res.status(401).json({
            message: ["Please input your email"]
        });
    } else if (error.name === "PasswordRequired") {
        res.status(401).json({
            message: ["Please input your password"]
        });
    } else if (error.name === "EmailAndPasswordRequired") {
        res.status(401).json({
            message: ["Please input your email and password"]
        });
    } else if (error.name === "Forbidden") {
        res.status(403).json({
            message: ["Forbidden"]
        });
    } else if (error.name === "NoToken") {
        res.status(401).json({
            message: ["Please login"]
        });
    } else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
        res.status(401).json({
            message: ["Invalid token"]
        });
    } else if (error.name === "alreadLike") {
        res.status(400).json({
            message: ["You Already Like this post"]
        });
    } else if (error.name === "ImgUrlRequired") {
        res.status(400).json({
            message: ["Image Url Required"]
        });
    } else if (error.name === "youDontLikeThisPostYet") {
        res.status(400).json({
            message: ["You dont like this post yet"]
        });
    } else if (error.name === "postNotFound") {
        res.status(404).json({
            message: ["Post Not Found"]
        });
    } else if (error.name === "CommentNotFound") {
        res.status(404).json({
            message: ["Comment Not Found"]
        });
    }

    else {
        res.status(500).json({
            message: ["Internal Server Error"]
        });
    }
}
;

module.exports = errorHandler;
