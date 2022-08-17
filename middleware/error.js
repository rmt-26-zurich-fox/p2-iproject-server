const errorHandler = (error, req, res, next) => {
    if (error.name === "SequelizeValidationError") res.status(400).json({ message: error.errors.map(e => e.message) })
    else if (error.name === "SequelizeUniqueConstraintError") res.status(400).json({ message: error.errors.map(e => e.message) })
    else if (error.name === "inputError") res.status(400).json({ message: "Invalid input" })
    else if (error.name === "weightError") res.status(400).json({ message: "Weight required" })
    else if (error.name === "heightError") res.status(400).json({ message: "Height required" })
    else if (error.name === "ageError") res.status(400).json({ message: "Age required" })
    else if (error.name === "genderError") res.status(400).json({ message: "Gender required" })
    else if (error.name === "notInt") res.status(400).json({ message: "Weight and Height must be number" })
    else if (error.name === "SequelizeForeignKeyConstraintError") res.status(400).json({ message: "Category not found" })
    else if (error.name === "noToken") res.status(401).json({ message: "Please login" })
    else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") res.status(401).json({ message: "Invalid Token" })
    else if (error.name === "invalid_email/password") res.status(401).json({ message: "Invalid email / password" })
    else if (error.name === "invalid_password") res.status(401).json({ message: "Invalid password" })
    else if (error.name === "invalid_status") res.status(401).json({ message: "Invalid status" })
    else if (error.name === "same_status") res.status(401).json({ message: "Same status!" })
    else if (error.name === "duplicate_wishlist") res.status(401).json({ message: "Craving already added!" })
    else if (error === "notFound") res.status(404).json({ message: "Product not found" })
    else res.status(500).json({ message: "Internal server error" })
}

module.exports = { errorHandler }