function ErrorHandler(error,req,res,next){
    console.log(error)
      if (error.name === "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
          res.status(400).json({
            message: error.errors[0].message
          })
        }
        else if(error.name == 'TypeError'){
          res.status(401).json({
            message: 'Username or Password invalid'
          })
        }
        else if(error.name== 'Username or Password invalid'){
          res.status(401).json({
              message: 'Username or Password invalid'
          })
        }
        else if(error.name=='No Token'){
          res.status(401).json({
            message: 'Please Login'
        })
        }
        else if(error.name== 'Unauthorized' || error.name== 'JsonWebTokenError' ){
          res.status(401).json({
            message:'Invalid Token'
        })
        }
        else if(error.name== 'Forbidden'){
          res.status(403).json({
            message:'Forbidden'
        })
        }
        else if(error.name== "data not found"){
          res.status(404).json({
              message: 'data not found'
          })
        } else if(error.name== "must be unique"){
          res.status(400).json({
              message: 'already have in favourite list'
          })
        }
        else {
          res.status(500).json({
            message: "Internal server error",
          });
        }
  }
  
  module.exports= {ErrorHandler}