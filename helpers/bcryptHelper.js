const {hashSync,compareSync}=require('bcryptjs');

let hashPassword= (password)=>{
    return hashSync(password,10)
}

let comparePassword = (password, passwordInDb)=>{
    return compareSync(password,passwordInDb)
}


module.exports= {hashPassword,comparePassword}