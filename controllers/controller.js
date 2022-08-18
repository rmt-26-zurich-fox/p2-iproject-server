const wyrapi = require("../apis/wouldyouratherAPI");
const { User, Question, Answer, sequelize } = require("../models");
class Controller {
  static async getQuestion(request, response, next) {
    try {
      // const { data } = await wyrapi.get(
      //   "https://would-you-rather.p.rapidapi.com/wyr/random"
      // );
      // const question = data[0].question;
      const question =
        "Would you rather die in 20 years with no regrets or die in 50 years with many regrets";
      const splitQuestion = question.replace("?", "").slice(17).split(" or ");

      if (splitQuestion.length > 2) {
        const randomQuestion = await Question.findAll({
          order: sequelize.random(),
          limit: 1,
        });
        response.status(200).json({
          questionA: randomQuestion[0].dataValues.questionA,
          questionB: randomQuestion[0].dataValues.questionB,
        });
      } else {
        const saveQuestion = await Question.findOrCreate({
          where: {
            questionA: splitQuestion[0],
            questionB: splitQuestion[1],
          },
          defaults: {
            questionA: splitQuestion[0],
            questionB: splitQuestion[1],
          },
        });
        response.status(200).json({
          questionA: saveQuestion[0].dataValues.questionA,
          questionB: saveQuestion[0].dataValues.questionB,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
