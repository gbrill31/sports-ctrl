const dbRouter = require("express").Router();
const DB = require("../config/database");

let dbConnectionFailed = false;

dbRouter.get("/", function (req, res) {
  DB.checkConnection().then(
    (message) => {
      if (dbConnectionFailed) {
        res.header(
          "notification",
          JSON.stringify({
            type: "success",
            message: "Database connected !",
            options: {
              autoClose: 5000,
            },
          })
        );
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
