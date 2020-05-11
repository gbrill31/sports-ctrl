const gameRouter = require("express").Router();
const psqlDB = require('../config/database');

gameRouter.get('/all', (req, res) => {
    psqlDB.getAllGames().then((games) => {
        res.json(games).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Could Not Load All Games Played'
        }));
        res.status(err.code || 404);
    });
});

gameRouter.post('/create', function (req, res) {
    const { home, homeId, away, awayId, venue, active } = req.body;
    psqlDB.createGame(home, homeId, away, awayId, venue, active)
        .then((data) => {
            res.json(data[0]).status(200);
        }, (err) => {
            res.header('notification', JSON.stringify({
                type: 'error',
                message: 'Could Not Create A New Game'
            }));
            res.status(err.code || 500);
        });
});

gameRouter.get('/active', function (req, res) {
    psqlDB.getActiveGame().then((game) => {
        res.json(game.length ? game[0] : null).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Cannot Load Active Game'
        }));
        res.status(err.code || 404).json();
    });
});

gameRouter.get('/team', function (req, res) {
    psqlDB.getTeam(team).then((team) => {
        res.json(team).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Cannot Load Team'
        }));
        res.status(err.code || 404).json();
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