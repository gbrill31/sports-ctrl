const dbRouter = require("express").Router();
const DB = require('../config/database');

dbRouter.get('/', function (req, res) {
    DB.checkConnection().then((message) => {
        res.json(message || {}).status(200);
    }, () => {
        DB.connect().then((message) => {
            res.json(message || {}).status(200);
        }, (err) => {
            res.header('notification', JSON.stringify({
                type: 'error',
                message: 'Could Not Connect To Database'
            }));
            res.status(503).json({ error: err });
        });
    })

});

module.exports = dbRouter;
