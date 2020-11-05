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
