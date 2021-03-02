const gameRouter = require('express').Router();
const psqlDB = require('../config/database');

gameRouter.get('/all', (req, res) => {
  const ownerId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB.getAllGames(ownerId).then(
    (games) => {
      res.json(games).status(200);
    },
    (err) => {
      res.alertError('Could Not Load All Games Played');
      res.sendStatus(err.code || 404);
    }
  );
});

gameRouter.post('/create', function (req, res) {
  const { home, homeId, away, awayId, venue, leagueId, active } = req.body;
  const ownerId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB
    .createGame(
      ownerId,
      req.user.id,
      home,
      homeId,
      away,
      awayId,
      venue,
      leagueId,
      active
    )
    .then(
      (game) => {
        res.redirectTo('/game');
        res.json(game).status(200);
      },
      (err) => {
        res.alertError('Could Not Create A New Game');
        res.sendStatus(err.code || 500);
      }
    );
});

gameRouter.get('/active', function (req, res) {
  const ownerId = req.user.type !== 'admin' ? req.user.admin : req.user.id;
  psqlDB.getActiveGame(ownerId).then(
    (game) => {
      res.json(game).status(200);
    },
    (err) => {
      res.alertError('Cannot Load Active Game');
      res.sendStatus(err.code || 404);
    }
  );
});

gameRouter.post('/score', function (req, res) {
  const { gameId, teamId, points } = req.body;
  psqlDB.updateGameScore(gameId, teamId, points).then(
    (score) => {
      res.json(score).status(200);
    },
    (err) => {
      res.alertError('Cannot Update Score');
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post('/status', function (req, res) {
  const { gameId, status } = req.body;
  psqlDB.updateGameStatus(gameId, status).then(
    (status) => {
      res.json(status[0]).status(200);
    },
    (err) => {
      res.alertError('Cannot Update Game Status');
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post('/team-fouls', function (req, res) {
  const { gameId, teamId, fouls } = req.body;
  psqlDB.updateTeamFouls(gameId, teamId, fouls).then(
    (data) => {
      res.json(data).status(200);
    },
    (err) => {
      res.alertError('Cannot Update Team Fouls');
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post('/team-timeouts', function (req, res) {
  const { gameId, teamId, timeouts } = req.body;
  psqlDB.updateTeamTimeouts(gameId, teamId, timeouts).then(
    (data) => {
      res.json(data).status(200);
    },
    (err) => {
      res.alertError('Cannot Update Team Timeouts');
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post('/endgame', function (req, res) {
  const { gameId } = req.body;
  psqlDB.endActiveGame(gameId).then(
    (data) => {
      res.redirectTo('/');
      res.json(data).status(200);
    },
    (err) => {
      res.alertError('Cannot End Active Game');
      res.sendStatus(err.code || 500);
    }
  );
});

module.exports = gameRouter;
