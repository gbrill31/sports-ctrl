const teamsRouter = require('express').Router();
const psqlDB = require('../config/database');

teamsRouter.get('/all', (req, res) => {
  const userId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB.getAllTeams(userId).then(
    (teams) => {
      res.json(teams).status(200);
    },
    (err) => {
      res.alertError('Could Not Load All Teams');
      res.status(404).json(err);
    }
  );
});

teamsRouter.get('/team', (req, res) => {
  const { id } = req.query;
  psqlDB.getTeamById(id).then(
    (team) => {
      res.json(team[0]).status(200);
    },
    (err) => {
      res.alertError('Could Not Load Team');
      res.status(404).json(err);
    }
  );
});

teamsRouter.post('/save', function (req, res) {
  const { id, name, league, country, city } = req.body;
  if (!id) {
    psqlDB.createTeam(name, league, country, city).then(
      (data) => {
        res.alertSuccess(`Saved "${name}" successfully`);
        res.json(data[0]).status(200);
      },
      (err) => {
        res.alertError('Could Not Save Team');
        res.status(500).json(err);
      }
    );
  } else {
    psqlDB.updateTeam(id, name, league, country, city).then(
      (data) => {
        res.alertSuccess('Updated team successfully');
        res.json(data[0]).status(200);
      },
      (err) => {
        res.alertError('Could Not Save Team');
        res.sendStatus(500);
      }
    );
  }
});

teamsRouter.post('/delete', function (req, res) {
  const { id } = req.body;
  psqlDB.deleteTeam(id).then(
    () => {
      res.alertSuccess('Deleted team successfully');
      res.json(id).status(200);
    },
    (err) => {
      res.alertError('Could Not Delete Team');
      res.sendStatus(500);
    }
  );
});

module.exports = teamsRouter;
