const venuesRouter = require('express').Router();
const psqlDB = require('../config/database');

venuesRouter.get('/all', (req, res) => {
  const userId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB.getAllVenues(userId).then(
    (venues) => {
      res.json(venues).status(200);
    },
    (err) => {
      res.header(
        'notification',
        JSON.stringify({
          type: 'error',
          message: 'Could Not Load Venues',
        })
      );
      res.sendStatus(404);
    }
  );
});

venuesRouter.post('/save', function (req, res) {
  const { id, name, country, city, seats } = req.body;
  if (!id) {
    psqlDB.createVenue(name, country, city, seats).then(
      (data) => {
        res.alertSuccess(`Saved "${data[0].name}" venue successfully`);
        res.json(data[0]).status(200);
      },
      (err) => {
        res.alertError('Could Not Save Venue');
        res.sendStatus(500);
      }
    );
  } else {
    psqlDB.updateVenue(id, name, country, city, seats).then(
      (data) => {
        res.alertSuccess('Updated venue successfully');
        res.json(data[0]).status(200);
      },
      (err) => {
        res.alertError('Could Not Save Venue');
        res.sendStatus(500);
      }
    );
  }
});

venuesRouter.post('/delete', function (req, res) {
  const { id } = req.body;
  psqlDB.deleteVenue(id).then(
    () => {
      res.alertSuccess('Venue deleted succesfully');
      res.json(id).status(200);
    },
    (err) => {
      res.alertError('Could Not Delete Venue');
      res.sendStatus(500);
    }
  );
});

module.exports = venuesRouter;
