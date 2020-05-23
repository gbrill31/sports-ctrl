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
        res.sendStatus(500);
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
        res.sendStatus(404);
    });
});

playersRouter.post('/save', function (req, res) {
    const players = req.body;
    if (Array.isArray(players)) {
        psqlDB.addPlayers(players)
            .then((data) => {
                res.json(data).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Add Players'
                }));
                res.sendStatus(500);
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
                res.sendStatus(500);
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
            res.sendStatus(406);
        });
});


module.exports = playersRouter;