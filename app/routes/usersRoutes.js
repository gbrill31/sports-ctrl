const usersRouter = require('express').Router();
const psqlDB = require('../config/database');

usersRouter.get('/', (req, res) => {
  psqlDB
    .findUsersByAdminId(req.user.id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.alertError('Cannot get users from DB');
      res.sendStatus(503);
    });
});

module.exports = usersRouter;
