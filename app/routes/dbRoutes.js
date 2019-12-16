const dbRouter = require("express").Router();
const sqlDB = require('../config/database');

dbRouter.get('/', function (req, res) {
    sqlDB.connect().then((message) => {
        res.json(message);
    }, (err) => {
        res.status(500).send(err);
    });
});

dbRouter.get('/validate', function (req, res) {
    sqlDB.checkConnection().then((message) => {
        res.json(message);
    }, (err) => {
        res.status(500).send(err);
    });
});

module.exports = dbRouter;
