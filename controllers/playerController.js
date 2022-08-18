const { Player } = require("../models");
const { Op } = require("sequelize");

class PlayerController {
  static async getPlayersByTeamId(req, res, next) {
    try {
      const { teamId } = req.params;
      const players = await Player.findAll({
        where: {
          TeamId: teamId,
          position: {
            [Op.ne]: "",
          },
          height_feet: {
            [Op.ne]: null,
          },
          weight_pounds: {
            [Op.ne]: null,
          },
        },
      });
      res.status(200).json(players);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PlayerController;
