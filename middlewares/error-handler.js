const errorHandler = (error, req, res, next) => {

    console.log(error)

    if(error.name === 'SequelizeValidationError' || 
    error.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({
            message: error.errors[0].message
        })
    }else if(error.name === 'NotFound'){
        res.status(404).json({
            message: 'Not Found'
        })
    }else if(error.name === 'NoToken'){
        res.status(401).json({
            message: 'Please login'
        })
    }else if(error.name === 'Unauthorized' && error.name === 'JsonWebTokenError'){

        res.status(401).json({
            message: 'Invalid token'
        })
    }else if(error.name === 'Forbidden'){

        res.status(403).json({
            message: 'Forbidden Item'
        })
    }else if(error.name === 'Invalid password/email'){
        res.status(404).json({
            message: 'User is not found'
        })
    }else{

        res.status(500).json({
            message: 'Server Internal Error'
        })
    }
}

module.exports = {
    errorHandler
}