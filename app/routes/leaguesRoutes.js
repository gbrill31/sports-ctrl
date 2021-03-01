const leaguesRouter = require('express').Router();
const psqlDB = require('../config/database');

leaguesRouter.get('/all', (req, res) => {
  const userId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB.getAllLeagues(userId).then(
    (leagues) => {
      res.json(leagues).status(200);
    },
    (err) => {
      res.header(
        'notification',
        JSON.stringify({
          type: 'error',
          message: 'Could Not Load Leagues',
        })
      );
      res.sendStatus(404);
    }
  );
});

leaguesRouter.post('/save', function (req, res) {
  const {
    id,
    name,
    country,
    isHalves,
    quarterStartTime,
    attackStartTime,
    timeoutStartTime,
    maxTimeoutCount,
    maxOvertimeTimeoutCount,
    maxTeamFoulsCount,
    maxPlayerFoulsCount,
    maxTechFoulsCount,
  } = req.body;
  const userId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  if (!id) {
    psqlDB
      .createLeague(
        userId,
        name,
        country,
        isHalves,
        quarterStartTime,
        attackStartTime,
        timeoutStartTime,
        maxTimeoutCount,
        maxOvertimeTimeoutCount,
        maxTeamFoulsCount,
        maxPlayerFoulsCount,
        maxTechFoulsCount
      )
      .then(
        (data) => {
          res.alertSuccess(`Saved "${data[0].name}" league successfully`);
          res.json(data[0]).status(200);
        },
        (err) => {
          res.alertError('Could Not Save League');
          res.sendStatus(500);
        }
      );
  } else {
    psqlDB
      .updateLeague(
        id,
        name,
        country,
        isHalves,
        quarterStartTime,
        attackStartTime,
        timeoutStartTime,
        maxTimeoutCount,
        maxOvertimeTimeoutCount,
        maxTeamFoulsCount,
        maxPlayerFoulsCount,
        maxTechFoulsCount
      )
      .then(
        (data) => {
          res.alertSuccess('Updated league successfully');
          res.json(data[0]).status(200);
        },
        (err) => {
          res.alertError('Could Not Save League');
          res.sendStatus(500);
        }
      );
  }
});

leaguesRouter.get('/league', (req, res) => {
  const { id } = req.query;
  psqlDB.getLeagueById(id).then(
    (league) => {
      res.json(league[0]).status(200);
    },
    (err) => {
      res.alertError('Could Not Load League');
      res.status(404).json(err);
    }
  );
});

leaguesRouter.post('/delete', function (req, res) {
  const { id } = req.body;
  psqlDB.deleteLeague(id).then(
    () => {
      res.alertSuccess('League deleted successfully');
      res.json(id).status(200);
    },
    (err) => {
      res.alertError('Could Not Delete League');
      res.sendStatus(500);
    }
  );
});

module.exports = leaguesRouter;
