const { Op } = require("sequelize");
const axios = require("axios");
const { Disease, Profile, DiseaseSymptom, Symptom } = require("../models");
const midtransClient = require("midtrans-client");
const { get } = require("../routers");

class Controller {
  static async getProfile(req, res, next) {
    try {
      const getProfile = await Profile.findOne({
        where: { userId: req.user.id },
      });

      const getWeather = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${getProfile.location},ID?key=${process.env.WEATHER_KEY_ID}`;
      let dataWeather = await axios.get(`${getWeather}`);

      const getTemperature = ((5 / 9) * (dataWeather.data.days[0].temp - 32))
        .toString()
        .slice(0, 4);

      res.status(200).json({ getProfile, getTemperature });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        height,
        imageUrl,
        phoneNumber,
        location,
      } = req.body.data;

      const updateProfile = await Profile.update(
        {
          firstName,
          lastName,
          dateOfBirth,
          gender,
          height,
          imageUrl,
          phoneNumber,
          location,
        },
        { where: { userId: req.user.id } }
      );

      res.status(200).json({ updateProfile });
    } catch (error) {
      next(error);
    }
  }

  static async getDisease(req, res, next) {
    try {
      const { symptomId } = req.query;
      if (!symptomId) {
        throw { name: "NotFound" };
      }

      const symptomMulti = symptomId.split(",");
      const getDisease = await DiseaseSymptom.findAll({
        include: { model: Disease },
        where: { symptomId: symptomMulti },
        limit: 5,
      });
      if (getDisease.length === 0) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ getDisease });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getSymptom(req, res, next) {
    try {
      const symptom = await Symptom.findAll();
      res.status(200).json({ symptom });
    } catch {
      next(error);
    }
  }

  static async paymentMidtrans(req, res, next) {
    try {
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.SERVER_SERVER_KEY_MIDTRANS,
      });
      const randomId = Math.floor(Math.random() * 1000);
      let parameter = {
        transaction_details: {
          order_id: `YOUR-ORDERID-${randomId}`,
          gross_amount: 25000,
        },
        credit_card: {
          secure: true,
        },
      };
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      // console.log("transactionToken:", transactionToken);
      res.status(200).json({ transactionToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
