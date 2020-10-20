const dbRouter = require('express').Router();
const DB = require('../config/database');

let dbConnectionFailed = false;

dbRouter.get('/', function (req, res) {
  DB.checkConnection().then(
    (message) => {
      if (dbConnectionFailed) {
        res.alertSuccess('Database connected !');
        dbConnectionFailed = false;
      }
      res.json(message || {}).status(200);
    },
    () => {
      DB.connect().then(
        (message) => {
          dbConnectionFailed = false;
          res.json(message || {}).status(200);
        },
        () => {
          dbConnectionFailed = true;
          res.sendStatus(503);
        }
      );
    }
  );
});

module.exports = dbRouter;
