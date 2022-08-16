const { Player } = require("../models");

class PlayerController {
  static async getPlayersByTeamId(req, res, next) {
    try {
      const { teamId } = req.params;
      const players = await Player.findAll({
        where: {
          TeamId: teamId,
        },
      });
      res.status(200).json(players);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PlayerController;
