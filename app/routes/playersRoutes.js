const playersRouter = require("express").Router();
const psqlDB = require('../config/database');

playersRouter.get('/all', (req, res) => {
    psqlDB.getAllPlayers().then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Could Not Load All Players'
        }));
        res.status(500).json(err);
    });
});
playersRouter.get('/team', (req, res) => {
    const { id } = req.query;
    psqlDB.getPlayersByTeam(id).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Could Not Load Players For Requested Team'
        }));
        res.status(404).json(err);
    });
});

playersRouter.post('/save', function (req, res) {
    const players = req.body;
    if (Array.isArray(players)) {
        players.forEach((player) => {
            Object.assign(player, { stats: JSON.stringify(player.stats) });
        });
        psqlDB.addPlayers(players)
            .then((data) => {
                res.json(data).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Add Players'
                }));
                res.status(500).json(err);
            });
    } else {
        psqlDB.updatePlayer(players)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Update Players'
                }));
                res.status(500).json(err);
            });
    }
});

playersRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deletePlayer(id)
        .then(() => {
            res.json(id).status(200);
        }, (err) => {
            res.header('notification', JSON.stringify({
                type: 'error',
                message: 'Could Not Delete Player'
            }));
            res.status(406).json(err);
        });
});


module.exports = playersRouter;