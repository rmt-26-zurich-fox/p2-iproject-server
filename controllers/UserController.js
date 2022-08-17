class UserController {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, role } = req.body;
    try {
      let data = await User.create({
        username,
        email,
        password,
        phoneNumber,
        role: 'Customer',
      });

      res.status(201).json({
        message: 'success register customer',
        data: {
          username,
          email,
          phoneNumber,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
