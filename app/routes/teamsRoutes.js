const teamsRouter = require("express").Router();
const psqlDB = require('../config/database');

teamsRouter.get('/all', (req, res) => {
    psqlDB.getAllTeams().then((venues) => {
        res.json(venues).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});

teamsRouter.post('/save', function (req, res) {
    const { id, name, country, city } = req.body;
    if (!id) {
        psqlDB.createTeam(name, country, city)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.status(err.code || 500);
            });
    } else {
        psqlDB.updateTeam(id, name, country, city)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.status(err.code || 500);
            })
    }
});

teamsRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deleteTeam(id)
        .then(() => {
            res.json(id).status(200);
        }, (err) => {
            res.status(err.code || 500);
        });
});


module.exports = teamsRouter;