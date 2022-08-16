const authorizationAdmin = async (req, res, next) => {
    try {
        if(req.user.role == "Admin") return next();
        throw { name: "forbidden"}
    } catch (error) {
        next(error);
    }
}

module.exports = authorizationAdmin;