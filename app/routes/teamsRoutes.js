const teamsRouter = require("express").Router();
const psqlDB = require('../config/database');

teamsRouter.get('/all', (req, res) => {
    psqlDB.getAllTeams().then((teams) => {
        res.json(teams).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Could Not Load All Teams'
        }));
        res.status(404).json(err);
    });
});

teamsRouter.post('/save', function (req, res) {
    const { id, name, league, country, city } = req.body;
    if (!id) {
        psqlDB.createTeam(name, league, country, city)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Save Team'
                }));
                res.status(500).json(err);
            });
    } else {
        psqlDB.updateTeam(id, name, league, country, city)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Save Team'
                }));
                res.sendStatus(500);
            })
    }
});

teamsRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deleteTeam(id)
        .then(() => {
            res.json(id).status(200);
        }, (err) => {
            res.header('notification', JSON.stringify({
                type: 'error',
                message: 'Could Not Delete Team'
            }));
            res.sendStatus(500);
        });
});


module.exports = teamsRouter;