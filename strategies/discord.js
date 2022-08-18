// // const passport = require("passport");
// // const { Strategy } = require("passport-discord");
// const { User } = require("../models");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) => {
//   User.findByPk(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.use(
//   "discord",
//   new Strategy(
//     {
//       accessTokenUrl: "https://discord.com/api/oauth2/token",
//       clientID: process.env.DISCORD_CLIENT_ID,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET,
//       callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
//       scope: ["identify"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // console.log(profile);
//         const discordUser = await User.findOne({
//           where: {
//             email: profile.email,
//           },
//         });
//         if (discordUser) {
//           return done(null, discordUser);
//         } else {
//           const registerDiscord = await User.create({
//             email: profile.email,
//             password: "passwordDariDiscord",
//             role:'customer',
//           });
//           return done(null, registerDiscord);
//         }
//       } catch (error) {
//         return done(error, null);
//       }
//     }
    
//   )
// );
