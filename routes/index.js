const router = require("express").Router();

const userRouter = require("./users");
const newsRouter = require("./news");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

router.use("/users", userRouter);

router.use(async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Token not Found" };
    }
    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
    // console.log(payload);
    // console.log(access_token);
  } catch (error) {
    next(error);
  }
});
router.use("/news", newsRouter);

// router.post('/news/create', Controller.create)
// router.get('/news', Controller.read)
// router.get('/news/:id', Controller.readById)
// router.delete('/news/:id', Controller.delete)

module.exports = router;
