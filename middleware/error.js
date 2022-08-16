const errorHandler = (error, req, res, next) => {
    if (error.name === "SequelizeValidationError") res.status(400).json({ message: error.errors.map(e => e.message) })
    else if (error.name === "SequelizeUniqueConstraintError") res.status(400).json({ message: error.errors.map(e => e.message) })
    else if (error.name === "SequelizeForeignKeyConstraintError") res.status(400).json({ message: "Category not found" })
    else if (error.name === "noToken") res.status(401).json({ message: "Please login" })
    else if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") res.status(401).json({ message: "Invalid Token" })
    else if (error.name === "invalid_email/password") res.status(401).json({ message: "Invalid email / password" })
    else if (error.name === "invalid_password") res.status(401).json({ message: "Invalid password" })
    else if (error.name === "invalid_status") res.status(401).json({ message: "Invalid status" })
    else if (error.name === "same_status") res.status(401).json({ message: "Same status!" })
    else if (error.name === "duplicate_wishlist") res.status(401).json({ message: "Wishlist already added!" })
    else if (error.name === "notAdmin") res.status(403).json({ message: "Not an Admin" })
    else if (error.name === "notCustomer") res.status(403).json({ message: "Not a Customer" })
    else if (error === "notFound") res.status(404).json({ message: "Product not found" })
    else res.status(500).json({ message: "Internal server error" })
}

module.exports = { errorHandler }