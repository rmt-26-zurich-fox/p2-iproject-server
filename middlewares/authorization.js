const {User, Product} = require('../models')

async function authorization(req, res, next) {
    try {
      let currentUser = await User.findByPk(req.loggedUser.id)
  
      if (currentUser.role === "admin") {
        next();
      } else {
        throw { name: "forbidden" };
      }
    } catch (error) {
        console.log(error);

      if(error.name==='forbidden') res.status(403).json({message:'forbidden access, admin only!'})
    }
  }

module.exports=authorization