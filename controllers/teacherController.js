const { User, Course } = require("../models");
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

class TeacherController {
  static async addCourse(req, res, next) {
    try {
      const { title, description, duration, price } = req.body;
      const response = await Course.create({
        title,
        description,
        duration,
        price,
        UserId: req.user.id,
      });
      res.status(201).json({
        message: `successfully created new Course`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCourse(req, res, next) {
    try {
      const { title, description, duration, price } = req.body;
      const { courseId } = req.params;

      const response = await Course.update(
        { title, description, duration, price },
        { where: { id: courseId } }
      );
      console.log(response);
      res.status(200).json({ message: `Course has been edited` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCourse(req, res, next) {
    try {
      const { courseId } = req.params;
      let course = await Course.destroy({
        where: {
          id: courseId,
        },
      });
      if (!course) {
        throw { name: `NotFound` };
      } else {
        res.status(200).json({
          message: `Course is deleted`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
  //===================================================================================

  static async googleCalendar(req, res, next) {
    try {
      // If modifying these scopes, delete token.json.
      const SCOPES = ["https://www.googleapis.com/auth/calendar"];
      // The file token.json stores the user's access and refresh tokens, and is
      // created automatically when the authorization flow completes for the first
      // time.
      const TOKEN_PATH = "token.json";

      // Load client secrets from a local file.
      fs.readFile("./credentials.json", (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listEvents);
      });

      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const { client_secret, client_id, redirect_uris } =
          credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris
        );

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getAccessToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });
      }

      /**
       * Get and store new token after prompting for user authorization, and then
       * execute the given callback with the authorized OAuth2 client.
       * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
       * @param {getEventsCallback} callback The callback for the authorized client.
       */
      function getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: "offline",
          scope: SCOPES,
        });
        console.log("Authorize this app by visiting this url:", authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question("Enter the code from that page here: ", (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }

      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function listEvents(auth) {
        const calendar = google.calendar({ version: "v3", auth });
        calendar.events.list(
          {
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
          },
          (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const events = res.data.items;
            if (events.length) {
              console.log("Upcoming 10 events:");
              events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
              });
            } else {
              console.log("No upcoming events found.");
            }
          }
        );
        console.log(calendar);
        res.status(200).json({ calendar });
      }
    } catch (error) {
      next(error);
    }
  }
  //=========================================================================

  static async addCalendarEvent(req, res, next) {
    try {
      const { google } = require("googleapis");
      const { OAuth2 } = google.auth;

      const oAuth2Client = new OAuth2(
        "799821746713-7385u0fqcftgk1utord95u2ki45bku5d.apps.googleusercontent.com",
        "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"
      );

      oAuth2Client.setCredentials({
        refresh_token:
          "1//04yzVHTqaas9-CgYIARAAGAQSNwF-L9Ir_KjU57lOL7VPRCp4trmGsdWSsgkBg0dMP9EUFIHirzi3SJzcAk9vUMLQSM9G1LBTiEY",
      });

      const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

      const eventStartTime = new Date();
      eventStartTime.setDate(eventStartTime.getDay() + 2);

      const eventEndTime = new Date();
      eventEndTime.setDate(eventEndTime.getDay() + 2);
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 60);

      const event = {
        summary: `${req.body.summary}`,
        description: `${req.body.description}`,
        colorId: 6,
        start: {
          dateTime: eventStartTime,
        },
        end: {
          dateTime: eventEndTime,
        },
      };

      calendar.freebusy.query(
        {
          resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            items: [{ id: "primary" }],
          },
        },
        (err, res) => {
          if (err) return console.error("Free Busy Query Error: ", err);

          const eventArr = res.data.calendars.primary.busy;

          if (eventArr.length === 0) {
            return calendar.events.insert(
              { calendarId: "primary", resource: event },
              (err) => {
                if (err)
                  return console.error("Error Creating Calender Event:", err);

                return console.log("Event created successfully.");
              }
            );
          }

          return console.log(`Sorry I'm busy for that time...`);
        }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeacherController;
