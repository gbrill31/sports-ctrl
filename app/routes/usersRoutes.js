const usersRouter = require('express').Router();
const psqlDB = require('../config/database');
const passwordsUtils = require('../utils/passwords');
const emailUser = require('../utils/email');

usersRouter.get('/', (req, res) => {
  psqlDB
    .findUsersByAdminId(req.user.id)
    .then((users) => {
      users.forEach((user) => {
        delete user.salt;
        delete user.hash;
      });
      res.status(200).json(users);
    })
    .catch((err) => {
      res.alertError('Cannot get users from DB');
      res.sendStatus(503);
    });
});

usersRouter.post('/update', (req, res) => {
  const { name, email, oldEmail } = req.body;
  let tempPassword, salt, hash;
  psqlDB
    .findUser(oldEmail)
    .then((user) => {
      if (email !== oldEmail) {
        tempPassword = passwordsUtils.generateTempPassword();
        const {
          salt: newSalt,
          hash: newHash,
        } = passwordsUtils.generatePassword(tempPassword);
        salt = newSalt;
        hash = newHash;
        emailUser.send('firstLogin', { ...user, tempPassword, email });
      }
      psqlDB
        .updateUser({
          ...user,
          name,
          email,
          salt: salt || user.salt,
          hash: hash || user.hash,
        })
        .then(() => {
          res.alertSuccess('Updated user successfully, New Temp Password Sent');
          res.status(200).json({});
        })
        .catch((err) => {
          res.alertError('Cannot update user');
          res.sendStatus(503);
        });
    })
    .catch((err) => {
      res.alertError('Cannot find user');
      res.sendStatus(503);
    });
});

usersRouter.post('/delete', (req, res) => {
  const { ids } = req.body;
  psqlDB
    .deleteUsers(ids)
    .then(() => {
      res.alertSuccess('Deleted users successfully');
      res.status(200).json({});
    })
    .catch((err) => {
      res.alertError('Cannot delete users from DB');
      res.sendStatus(503);
    });
});

module.exports = usersRouter;
