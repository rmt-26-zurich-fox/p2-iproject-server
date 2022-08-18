function errorHandle(error, req, res, next) {
    console.log(error)
    if (error.name == 'noToken') {
        res.status(400).json({ message: "Invalid Token" })
    } else if (error.name === 'Bad Request') {
        res.status(401).json({ message: "Please Login" })
    } else if (error.name === 'Badrequest') {
        res.status(401).json({ message: "Please Upgrade" })
    } else if (error.name === 'Unauthorized') {
        res.status(401).json({ message: "Please Login" })
    } else if (error.name === 'InvalidInput') {
        res.status(403).json({ message: "Invalid email/password" })
    } else if (error.name === 'NotFound') {
        res.status(404).json({ message: "Data not found" })
    } else {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = errorHandle