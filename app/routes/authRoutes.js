const authRouter = require('express').Router();
const passport = require('passport');
const passwordsUtils = require('../utils/passwords');
const psqlDB = require('../config/database');
const jwtUtils = require('../utils/jwt');

authRouter.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  psqlDB
    .findUser(email)
    .then((user) => {
      if (!user) {
        const { salt, hash } = passwordsUtils.generatePassword(password);

        const user = {
          name,
          email,
          salt,
          hash,
          admin: null,
          type: 'admin',
          firstLogin: false,
        };

        psqlDB
          .createUser(user)
          .then(() => {
            res.alertSuccess('User registered successfuly');
            res.redirectTo('/login');
            res.status(200).json({});
          })
          .catch((err) => {
            res.alertError('Db error, cannot create user');
            res.sendStatus(err.code || 503);
          });
      } else {
        res.alertError('Cannot create user, user already exists');
        res.sendStatus(403);
      }
    })
    .catch((err) => {
      res.alertError('Db error, cannot create user');
      res.sendStatus(err.code || 503);
    });
});

// passport.authenticate('local', (err, user, info) => {
//   if (err) {
//     return next(err);
//   }
//   if (!user) {
//     res.alertError('Try again, Username or Pawwsord are incorrect');
//     return res.sendStatus(401);
//   }
//   delete user.hash;
//   delete user.salt;

//   req.logIn(user, function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.alertSuccess('You have logged in successfuly');
//     res.status(200).json(user);
//   });
// })(req, res, next);

authRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  psqlDB.findUser(email).then((user) => {
    if (
      !user ||
      !passwordsUtils.validatePassword(password, user.hash, user.salt)
    ) {
      res.alertError('Try again, Username or Password are incorrect');
      return res.sendStatus(401);
    }
    const { token, expires } = jwtUtils.issueJwt(user.id);

    delete user.hash;
    delete user.salt;

    res.alertSuccess(`Welcome ${user.name}, You have logged in successfuly`);
    res.status(200).json({ user, token, expires });
  });
});

authRouter.get('/logout', (req, res) => {
  res.redirectTo('/login');
  res.sendStatus(200);
});

authRouter.get(
  '/verifylogin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user) {
      return res.status(200).json(req.user);
    }
    return res.status(401).json({});
  }
);

module.exports = authRouter;
