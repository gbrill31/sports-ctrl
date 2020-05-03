const playersRouter = require("express").Router();
const psqlDB = require('../config/database');

playersRouter.get('/all', (req, res) => {
    psqlDB.getAllPlayers().then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});
playersRouter.get('/team', (req, res) => {
    const { id } = req.query;
    psqlDB.getPlayersByTeam(id).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});

playersRouter.post('/save', function (req, res) {
    const players = req.body;
    psqlDB.addPlayers(players)
        .then((data) => {
            res.json(data).status(200);
        }, (err) => {
            res.status(err.code || 500);
        });
    // if (!id) {
    //     psqlDB.addPlayers(players)
    //         .then((data) => {
    //             res.json(data[0]).status(200);
    //         }, (err) => {
    //             res.status(err.code || 500);
    //         });
    // } else {
    //     psqlDB.updateTeam(name, number, team, teamId)
    //         .then((data) => {
    //             res.json(data[0]).status(200);
    //         }, (err) => {
    //             res.status(err.code || 500);
    //         })
    // }
});

playersRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deleteTeam(id)
        .then(() => {
            res.json(id).status(200);
        }, (err) => {
            res.status(err.code || 500);
        });
});


module.exports = playersRouter;