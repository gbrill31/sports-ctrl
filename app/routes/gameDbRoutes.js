const gameRouter = require("express").Router();
const psqlDB = require('../config/database');

gameRouter.get('/all', (req, res) => {
    psqlDB.getAllGames().then((games) => {
        res.json(games).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});

gameRouter.post('/create', function (req, res) {
    const { home, away, venue } = req.body;
    psqlDB.createGame(home, away, venue)
        .then((data) => {
            res.json(data[0]).status(200);
        }, (err) => {
            res.status(err.code || 500);
        });
});

function getTeam(team) {
    return new Promise((resolve, reject) => {
        psqlDB.getTeam(team).then((team) => {
            resolve(team);
        }, (err) => {
            reject(err);
        });
    });
}

gameRouter.get('/exists', function (req, res) {
    psqlDB.hasGame(true).then((isGameExist) => {
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

gameRouter.post('/updateteam', function (req, res) {
    let team = req.body.team;
    psqlDB.updateTeam(team).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.sendStatus(err.code || 500);
    });
});


module.exports = gameRouter;