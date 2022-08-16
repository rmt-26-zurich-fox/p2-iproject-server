const { Team, TeamImage } = require("../models");
const axios = require("axios");

class TeamController {
  static async getSpecificTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const targetTeam = await Team.findOne({
        where: {
          id: teamId,
        },
        include: {
          model: TeamImage,
          attributes: ["imageUrl"],
        },
      });
      if (!targetTeam) {
        throw { name: "teamNotFound" };
      }
      const wikiResponse = await axios.get(
        `https://wikiapi.p.rapidapi.com/api/v1/wiki/sports/nba/team/info/${targetTeam.full_name
          .split(" ")
          .join("_")
          .toLowerCase()}?lan=en`,
        {
          headers: {
            "X-RapidAPI-Key":
              "004fb19f8dmshbb345b8d17adfefp1ac00ejsn0f9611c5a2a4",
            "X-RapidAPI-Host": "wikiapi.p.rapidapi.com",
          },
        }
      );
      delete targetTeam.dataValues.createdAt;
      delete targetTeam.dataValues.updatedAt;
      targetTeam.dataValues.location = wikiResponse.data.location;
      targetTeam.dataValues.arena = wikiResponse.data.arena;
      targetTeam.dataValues.team_colors = wikiResponse.data.team_colors;
      targetTeam.dataValues.main_sponsor = wikiResponse.data.main_sponsor;
      targetTeam.dataValues.conference = wikiResponse.data.conference;
      targetTeam.dataValues.division = wikiResponse.data.division;
      targetTeam.dataValues.head_coach = wikiResponse.data.head_coach;
      targetTeam.dataValues.president = wikiResponse.data.president;
      targetTeam.dataValues.general_manager = wikiResponse.data.general_manager;
      targetTeam.dataValues.ownership = wikiResponse.data.ownership;
      targetTeam.dataValues.championships = wikiResponse.data.championships;
      targetTeam.dataValues.conference_titles =
        wikiResponse.data.conference_titles;
      targetTeam.dataValues.division_titles = wikiResponse.data.division_titles;
      targetTeam.dataValues.retired_numbers = wikiResponse.data.retired_numbers;
      targetTeam.dataValues.website = wikiResponse.data.website;
      res.status(200).json(targetTeam);
    } catch (error) {
      next(error);
    }
  }

  static async getAllTeams(req, res, next) {
    try {
      const teams = await Team.findAll({
        include: {
          model: TeamImage,
          attributes: ["imageUrl"],
        },
      });
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  static async dummy(req, res, next) {
    try {
      let result = [];
      for (let id = 1; id <= 38; id++) {
        const response = await axios.get(
          `https://www.balldontlie.io/api/v1/players?per_page=100&page=${id}`
        );
        const { data } = response.data;
        console.log(response.data);
        data.forEach((element) => {
          element.TeamId = element.team.id;
          delete element.team;
          result.push(element);
        });
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeamController;
// const dataFix = await teamsList.map(async (el, i) => {
//     setTimeout(async () => {
//       try {
//         let name = el.full_name.split(" ").join("_").toLowerCase();
//         const wikiResponse = await axios.get(
//           `https://wikiapi.p.rapidapi.com/api/v1/wiki/sports/nba/team/info/${name}?lan=en`,
//           {
//             headers: {
//               "X-RapidAPI-Key":
//                 "004fb19f8dmshbb345b8d17adfefp1ac00ejsn0f9611c5a2a4",
//               "X-RapidAPI-Host": "wikiapi.p.rapidapi.com",
//             },
//             timeout: 10000,
//           }
//         );
//         el.location = wikiResponse.data.location;
//         el.arena = wikiResponse.data.arena;
//         el.team_colors = wikiResponse.data.location;
//         el.main_sponsor = wikiResponse.data.main_sponsor;
//         el.conference = wikiResponse.data.conference;
//         el.division = wikiResponse.data.division;
//         el.head_coach = wikiResponse.data.head_coach;
//         el.president = wikiResponse.data.president;
//         el.general_manager = wikiResponse.data.general_manager;
//         el.ownership = wikiResponse.data.ownership;
//         el.championships = wikiResponse.data.championships;
//         el.conference_titles = wikiResponse.data.conference_titles;
//         el.division_titles = wikiResponse.data.division_titles;
//         el.retired_numbers = wikiResponse.data.retired_numbers;
//         el.website = wikiResponse.data.website;
//         el.img_url = wikiResponse.data.flag_img;
//         console.log(el);
//         return el;
//       } catch (error) {
//         console.log(error);
//       }
//       return Promise.all(dataFix);
//     }, i * 2000);
//   });
