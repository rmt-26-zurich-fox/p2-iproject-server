const { Team, TeamImage, ProfileTeam } = require("../models");
const axios = require("axios");
const rapidApiKey = process.env.RAPID_API_KEY;
const currentApiKey = process.env.CURRENT_API;

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
      if (targetTeam.name === "Clippers") {
        delete targetTeam.dataValues.createdAt;
        delete targetTeam.dataValues.updatedAt;
        targetTeam.dataValues.location = "Los Angeles, California";
        targetTeam.dataValues.arena = "Cypto.com Arena";
        targetTeam.dataValues.team_colors =
          "	Red, royal blue, black, silver, white";
        targetTeam.dataValues.main_sponsor = "Honey";
        targetTeam.dataValues.conference = "Western";
        targetTeam.dataValues.division = "Pacific";
        targetTeam.dataValues.head_coach = "Tyronn Lue";
        targetTeam.dataValues.president = "Lawrence Frank";
        targetTeam.dataValues.general_manager = "Michael Winger";
        targetTeam.dataValues.ownership = "Steve Ballmer";
        targetTeam.dataValues.championships = "0";
        targetTeam.dataValues.conference_titles = "0";
        targetTeam.dataValues.division_titles = "2 (2013, 2014";
        targetTeam.dataValues.retired_numbers = "-";
        targetTeam.dataValues.website = "www.nba.com/clippers";
      } else {
        const wikiResponse = await axios.get(
          `https://wikiapi.p.rapidapi.com/api/v1/wiki/sports/nba/team/info/${targetTeam.full_name
            .split(" ")
            .join("_")
            .toLowerCase()}?lan=en`,
          {
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
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
        targetTeam.dataValues.general_manager =
          wikiResponse.data.general_manager;
        targetTeam.dataValues.ownership = wikiResponse.data.ownership;
        targetTeam.dataValues.championships = wikiResponse.data.championships;
        targetTeam.dataValues.conference_titles =
          wikiResponse.data.conference_titles;
        targetTeam.dataValues.division_titles =
          wikiResponse.data.division_titles;
        targetTeam.dataValues.retired_numbers =
          wikiResponse.data.retired_numbers;
        targetTeam.dataValues.website = wikiResponse.data.website;
      }
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

  static async getLikedTeams(req, res, next) {
    try {
      const { profileId } = req.user;
      const likedTeams = await ProfileTeam.findAll({
        where: {
          ProfileId: profileId,
        },
        include: {
          model: Team,
          include: {
            model: TeamImage,
            attributes: ["imageUrl"],
          },
        },
      });
      res.status(200).json(likedTeams);
    } catch (error) {
      next(error);
    }
  }

  static async getNews(req, res, next) {
    try {
      const { teamId } = req.params;
      const teamTarget = await Team.findOne({
        where: {
          id: teamId,
        },
      });
      let result = await axios.get(
        `https://api.currentsapi.services/v1/search?apiKey=${currentApiKey}&page_size=15&keywords=${teamTarget.full_name}`
      );
      const { data } = result;
      res.status(200).json(data.news);
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
