const { User, UserCredit } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
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
    // const { id } = req.user;
    const { creditNumber, expiryDate, cvv } = req.body;
    
    const response = await UserCredit.create({
      // id:1,
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

module.exports = {
  register,
  login,
  googleSignIn,
  myProfile,
  registerCredit
}