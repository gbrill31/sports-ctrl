const express = require('express');

module.exports = function (passport) {
  const router = express.Router();

  router.use(function (req, res, next) {
    return passport.authenticate(
      'jwt',
      { session: false },
      (err, user, info) => {
        if (user) {
          req.user = user;
          return next();
        }

        if (err) {
          return next(err);
        }
      }
    )(req, res, next);
  });
  return router;
};
