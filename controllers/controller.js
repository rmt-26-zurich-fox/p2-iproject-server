const wyrapi = require("../apis/wouldyouratherAPI");
const { User, Question, Answer, sequelize } = require("../models");
class Controller {
  static async getQuestion() {
    try {
      const { data } = await wyrapi.get(
        "https://would-you-rather.p.rapidapi.com/wyr/random"
      );
      const question = data[0].question;
      // const question =
      //   "Would you rather die in 20 years with no regrets or die in 50 years with many regrets";
      const splitQuestion = question.replace("?", "").slice(17).split(" or ");

      if (splitQuestion.length > 2) {
        const randomQuestion = await Question.findAll({
          order: sequelize.random(),
          limit: 1,
        });
        return {
          id: randomQuestion[0].dataValues.id,
          questionA: randomQuestion[0].dataValues.questionA,
          questionB: randomQuestion[0].dataValues.questionB,
        };
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
        return {
          id: saveQuestion[0].dataValues.id,
          questionA: saveQuestion[0].dataValues.questionA,
          questionB: saveQuestion[0].dataValues.questionB,
        };
      }
    } catch (error) {
      return error;
    }
  }

  static async getResult(data, question) {
    const users = await User.findAll();
    const userIds = users
      .filter((user) => data.includes(user.email))
      .map((user) => user.id);
    const answers = await Answer.findAll({
      where: {
        QuestionId: question.id,
      },
      include: {
        model: User,
      },
    });
    const answerFormated = answers.filter((answer) =>
      userIds.includes(answer.UserId)
    );
    return answers;
  }

  static async saveAnswer(payload) {
    try {
      const { QuestionId, answer, email } = payload;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      const createAnswer = {
        QuestionId,
        UserId: user.id,
        answer,
      };
      const saveAnswer = await Answer.create(createAnswer);
    } catch (error) {
      return error;
    }
  }

  static async createUser(email) {
    try {
      const user = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Controller;
