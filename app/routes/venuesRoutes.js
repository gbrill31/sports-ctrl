const venuesRouter = require("express").Router();
const psqlDB = require('../config/database');

venuesRouter.get('/all', (req, res) => {
    psqlDB.getAllVenues().then((venues) => {
        res.json(venues).status(200);
    }, (err) => {
        res.status(err.code || 500);
    });
});

venuesRouter.post('/create', function (req, res) {
    const { name, country, city, seats } = req.body;
    psqlDB.createVenue(name, country, city, seats)
        .then((data) => {
            res.json(data[0]).status(200);
        }, (err) => {
            res.status(err.code || 500);
        });
});

venuesRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deleteVenue(id)
        .then(() => {
            res.json(id).status(200);
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

venuesRouter.get('/team', function (req, res) {
    getTeam(JSON.parse(req.query.team)).then((team) => {
        res.json(team);
    }, (err) => {
        res.status(err.code || 500);
    });
});

venuesRouter.post('/updateteam', function (req, res) {
    let team = req.body.team;
    psqlDB.updateTeam(team).then((players) => {
        res.json(players).status(200);
    }, (err) => {
        res.sendStatus(err.code || 500);
    });
});


module.exports = venuesRouter;