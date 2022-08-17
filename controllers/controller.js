const { User, Question, Answer } = require("../models");
const axios = require("axios");
class controller {
  // some methods
  // async checkSession(request, response, next) {
  //   try {

  //   } catch (error) {
  //     next(error);
  //   }
  // }
  async userRegister(request, respone, next) {
    try {
      console.log(request.headers);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controller;
