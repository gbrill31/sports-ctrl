const gameRouter = require("express").Router();
const sqlDB = require('../config/database');

function getTeam(team) {
    return new Promise((resolve, reject) => {
        sqlDB.getTeam(team).then((team) => {
            resolve(team);
        }, (err) => {
            reject(err);
        });
    });
}

gameRouter.get('/exists', function (req, res) {
    sqlDB.hasGame(true).then((isGameExist) => {
        res.json(isGameExist);
    }, (err) => {
        res.status(err.code || 500);
    });
});

gameRouter.get('/team', function (req, res) {
    getTeam(JSON.parse(req.query.team)).then((team) => {
        res.json(team);
    }, (err) => {
        res.status(err.code || 500);
    });
});

gameRouter.post('/createnew', function (req, res) {
    sqlDB.newGame(true).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});

gameRouter.post('/updateteam', function (req, res) {
    let team = req.body.team;
    sqlDB.updateTeam(team).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.sendStatus(err.code || 500);
    });
});


module.exports = gameRouter;