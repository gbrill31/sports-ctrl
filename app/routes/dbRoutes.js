const dbRouter = require("express").Router();
const sqlDB = require('../config/database');

dbRouter.get('/', function (req, res) {
    sqlDB.connect().then((message) => {
        res.json(message).status(200);
    }, (err) => {
        res.status(err.code || 500).send({ error: err });
    });
});

dbRouter.get('/validate', function (req, res) {
    sqlDB.checkConnection().then((message) => {
        res.json(message).status(200);
    }, (err) => {
        res.status(err.code || 500).send({ error: err });
    });
});

module.exports = dbRouter;
