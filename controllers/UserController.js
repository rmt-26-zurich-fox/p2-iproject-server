const { User, UserCredit, Leaderboard, Subscription } = require("../models");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const register = async (req, res, next) => {
  try {

    const { email, password, firstName, lastName, birthDate } = req.body;

    const response = await User.create({
      email,
      password,
      firstName,
      lastName,
      birthDate,
    });

    res.status(201).json({
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      birthDate: response.birthDate,
      phoneNumber: response.phoneNumber,
    });

  } catch (err) {
    next(err);
  }
}

const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if(!email || !password){
      throw { name: "Invalid email or password" }
    }

    const response = await User.findOne({
      where: {
        email
      }
    });

    if(!response){
      throw { name: "Invalid email or password" };
    }

    if(!comparePassword(password, response.password)){
      throw { name: "Invalid email or password" }
    }

    const payload = {
      id: response.id,
    }

    const access_token = signToken(payload);

    res.status(200).json({
      access_token
    });

  } catch (err) {
    next(err);
  }
}

const googleSignIn = async (req, res, next) => {
  try {
    const { google_token } = req.headers;

    res.status(200).json({
      message: "OK"
    })
  } catch (err) {
    next(err);
  }
}

const registerCredit = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { creditNumber, expiryDate, cvv } = req.body;
    console.log(req.body);
    const response = await UserCredit.create({
      id,
      creditNumber,
      expiryDate,
      cvv
    });

    res.status(201).json({
      id: response.id,
      creditNumber: response.creditNumber,
    })
  } catch (err) {
    next(err);
  }
}

const createLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.user;
    
    // const [response, create] = await User.findOrCreate({
    //   where: {
    //     id
    //   },
    //   defaults: {
    //     id
    //   }
    // });

    const response = await User.findAll({
      include: [
        UserCredit, Subscription,
        // {
        //   model: UserCredit,
        // }
      ],
    });

    res.status(201).json({
      // id: response.id,
      // point: response.point,
      response
    });

  } catch (err) {
    next(err);
  }
}

const myProfile = async (req, res, next) => {
  try {

    const { id } = req.user;

    const response = await User.findByPk(+id);

    res.status(200).json({
      id: response.id,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      phoneNumber: response.phoneNumber,
      birthDate: response.birthDate,
    });

  } catch (err) {
    next(err);
  }
}

const updateMyProfile = async (req, res, next) => {
  try {

    const { id } = req.user;

    const { email, password, firstName, lastName, phoneNumber, birthDate } = req.body;

    const response = await User.update({
      email, password, firstName, lastName, phoneNumber, birthDate
    }, {
      where: {
        id
      },
    });
    
    res.status(200).json({
      message: "User updated",
      id,
      response
    });

  } catch (err) {
    next(err);
  }
}
const updateMyCredit = async (req, res, next) => {
  try {

    const { id } = req.user;

    const { creditNumber, expiryDate, oldCvv, newCvv } = req.body;

    const userCredit = await UserCredit.findByPk(+id);

    if(!comparePassword(oldCvv, userCredit.cvv)){
      throw { name: "Invalid credentials" }
    }

    const hashedCvv = hashPassword(newCvv);

    const response = await UserCredit.update({
      creditNumber, expiryDate, cvv: hashedCvv
    }, {
      where: {
        id
      },
    });
    
    res.status(200).json({
      message: "User Credit updated",
      response
    });

  } catch (err) {
    console.log(err);
    next(err);
  }
}

const updateMyLeaderboard = async (req, res, next) => {
  try {

    const { id } = req.user;

    const { point } = req.body;

    const [find, create] = await Leaderboard.findOrCreate({
      where: {
        UserId: +id
      },
      defaults: {
        UserId: +id
      }
    });

    const response = await Leaderboard.update({
      point: +point
    }, {
      where: {
        UserId: +id
      },
    });
    
    res.status(200).json({
      message: "Leaderboard updated",
      response
    });

  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  googleSignIn,
  myProfile,
  updateMyProfile,
  updateMyCredit,
  updateMyLeaderboard,
  createLeaderboard,
  registerCredit
}