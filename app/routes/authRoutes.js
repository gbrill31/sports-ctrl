const authRouter = require('express').Router();
const passport = require('passport');
const passwordsUtils = require('../utils/passwords');
const psqlDB = require('../config/database');
const jwtUtils = require('../utils/jwt');
const emailUser = require('../utils/email');

authRouter.post('/register', (req, res) => {
  const { name, email, password, type, admin } = req.body;

  psqlDB
    .findUser(email)
    .then((user) => {
      if (!user) {
        const tempPassword = passwordsUtils.generateTempPassword();
        const { salt, hash } = passwordsUtils.generatePassword(
          password || tempPassword
        );

        const user = {
          name,
          email,
          salt,
          hash,
          admin,
          type: type || 'admin',
          firstLogin: type !== 'admin',
        };

        psqlDB
          .createUser(user)
          .then(() => {
            res.alertSuccess('User registered successfully');
            if (!type) {
              res.redirectTo('/userlogin');
            }
            emailUser.send('firstLogin', { ...user, tempPassword });
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
//     res.alertSuccess('You have logged in successfully');
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
    if (user.firstLogin) {
      res.redirectTo('firstlogin');
      return res.status(200).json({ user });
    }
    const { token, expires } = jwtUtils.issueJwt(user.id);

    delete user.hash;
    delete user.salt;

    res.alertSuccess(`Welcome ${user.name}, You have logged in successfully`);
    res.status(200).json({ user, token, expires });
  });
});

authRouter.post('/updatepass', (req, res, next) => {
  const { id, password } = req.body;

  psqlDB.findUserById(id).then((user) => {
    if (!user) {
      res.alertError('Try again, Username or Password are incorrect');
      return res.sendStatus(401);
    }
    const { salt, hash } = passwordsUtils.generatePassword(password);

    psqlDB
      .updatePassword(user, salt, hash)
      .then(() => {
        res.redirectTo('/userlogin');
        res.alertSuccess('Password updated successfully');
        res.status(200).json({});
      })
      .catch((err) => {
        res.redirectTo('/userlogin');
        res.alertError('Password could not update');
        res.status(200).json({});
      });
  });
});

authRouter.get('/logout', (req, res) => {
  res.redirectTo('/userlogin');
  res.sendStatus(200);
});

authRouter.get(
  '/verifylogin',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user) {
      return res.status(200).json(req.user);
    }
    res.redirectTo('/userlogin');
    return res.status(401).json({});
  }
);

module.exports = authRouter;
