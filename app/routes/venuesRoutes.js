const venuesRouter = require("express").Router();
const psqlDB = require('../config/database');

venuesRouter.get('/all', (req, res) => {
    psqlDB.getAllVenues().then((venues) => {
        res.json(venues).status(200);
    }, (err) => {
        res.header('notification', JSON.stringify({
            type: 'error',
            message: 'Could Not Load Venues'
        }));
        res.status(404).json(err);
    });
});

venuesRouter.post('/save', function (req, res) {
    const { id, name, country, city, seats } = req.body;
    if (!id) {
        psqlDB.createVenue(name, country, city, seats)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Save Venue'
                }));
                res.status(500).json(err);
            });
    } else {
        psqlDB.updateVenue(id, name, country, city, seats)
            .then((data) => {
                res.json(data[0]).status(200);
            }, (err) => {
                res.header('notification', JSON.stringify({
                    type: 'error',
                    message: 'Could Not Save Venue'
                }));
                res.status(500).json(err);
            })
    }
});

venuesRouter.post('/delete', function (req, res) {
    const { id } = req.body;
    psqlDB.deleteVenue(id)
        .then(() => {
            res.json(id).status(200);
        }, (err) => {
            res.header('notification', JSON.stringify({
                type: 'error',
                message: 'Could Not Delete Venue'
            }));
            res.status(500).json(err);
        });
});


module.exports = venuesRouter;