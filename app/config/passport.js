const passport = require('passport');
const fs = require('fs');
const path = require('path');
// const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const psqlDB = require('../config/database');

const PUB_KEY = fs.readFileSync(
  path.join(__dirname, '../..', 'rsa_pub.pem'),
  'utf8'
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
  passReqToCallback: true,
};

const strategy = new JwtStrategy(jwtOptions, (req, payload, done) => {
  psqlDB
    .findUserById(payload.sub)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      delete user.hash;
      delete user.salt;
      req.user = user;
      return done(null, user);
    })
    .catch((err) => done(err, false));
});

module.exports = (passport) => {
  passport.use(strategy);
};

/**
 * Passport local strategy
 */

// const localStrategyOptions = {
//   usernameField: 'email',
//   passwordField: 'password',
//   // passReqToCallback: true, // allows us to pass back the entire request to the callback
// };

// const strategy = new LocalStrategy(
//   localStrategyOptions,
//   (username, password, done) => {
//     psqlDB
//       .findUser(username)
//       .then((user) => {
//         if (!user) {
//           return done(null, false);
//         }
//         if (!validatePassword(password, user.hash, user.salt)) {
//           return done(null, false);
//         }
//         return done(null, user);
//       })
//       .catch((err) => done(err));
//   }
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {
//   psqlDB
//     .findUserById(userId)
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => done(err));
// });
