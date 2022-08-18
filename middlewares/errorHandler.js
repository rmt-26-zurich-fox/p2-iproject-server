const error = (error, req, res, next) => {
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            message: error.errors[0].message
        })
    } else if (error.name == 'EmailPassEmpty') {
        res.status(400).json({
            message: 'Email or password cannot be empty'
        })
    } else if (error.name == 'already_saved') {
        res.status(400).json({
            message: 'This location already saved'
        })
    } else if (error.name == 'invalid_email/password') {
        res.status(401).json({
            message: 'Invalid email or password'
        })
    } else if (error.name == 'NoToken') {
        res.status(401).json({
            message: 'Please login first'
        })
    } else if (error.name == 'Unauthorized' || error.name == 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid token'
        })
    } else if (error.name == 'NotFound') {
        res.status(404).json({
            message: 'Data not found'
        })
    } else if (error.response.data) {
        res.status(404).json({
            message: 'No matching location found'
        })
    } else {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = error