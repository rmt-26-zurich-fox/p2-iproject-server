const authorizeByAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") throw { code: 403, error: "Admin role only!" };
        next();
    } catch (error) {
        next(error);
    }
}

const authorizeByCustomer = async (req, res, next) => {
    try {
        if (req.user.role !== "Customer") throw { code: 403, error: "Customer role only!" };
        next();
    } catch (error) {
        next(error);
    }
}

const authorizeByAdminOrCustomer = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin" && req.user.role !== "Customer") throw { code: 403, error: "Admin / Customer role only!" };
        next();
    } catch (error) {
        next(error);
    }
}

const authorizeByCustomerOrGuest = async (req, res, next) => {
    try {
        if (req.user.role !== "Customer" && req.user.role !== "Guest") throw { code: 403, error: "Customer / Guest role only!" };
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    authorizeByAdmin,
    authorizeByCustomer,
    authorizeByAdminOrCustomer,
    authorizeByCustomerOrGuest
};