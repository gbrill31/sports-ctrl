const gameRouter = require("express").Router();
const psqlDB = require("../config/database");

gameRouter.get("/all", (req, res) => {
  psqlDB.getAllGames().then(
    (games) => {
      res.json(games).status(200);
    },
    (err) => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Load All Games Played",
        })
      );
      res.sendStatus(err.code || 404);
    }
  );
});

gameRouter.post("/create", function (req, res) {
  const { home, homeId, away, awayId, venue, active } = req.body;
  psqlDB.createGame(home, homeId, away, awayId, venue, active).then(
    (game) => {
      res.header("redirectTo", "/game");
      res.json(game).status(200);
    },
    (err) => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Create A New Game",
        })
      );
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.get("/active", function (req, res) {
  psqlDB.getActiveGame().then(
    (game) => {
      res.json(game).status(200);
    },
    (err) => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Cannot Load Active Game",
        })
      );
      res.sendStatus(err.code || 404);
    }
  );
});

gameRouter.post("/score", function (req, res) {
  const { gameId, teamId, points } = req.body;
  psqlDB.updateGameScore(gameId, teamId, points).then(
    (score) => {
      res.json(score).status(200);
    },
    (err) => {
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post("/status", function (req, res) {
  const { gameId, status } = req.body;
  psqlDB.updateGameStatus(gameId, status).then(
    (status) => {
      res.json(status[0]).status(200);
    },
    (err) => {
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post("/teamfouls", function (req, res) {
  const { gameId, teamId, fouls } = req.body;
  psqlDB.updateTeamFouls(gameId, teamId, fouls).then(
    (data) => {
      res.json(data).status(200);
    },
    (err) => {
      res.sendStatus(err.code || 500);
    }
  );
});

gameRouter.post("/endgame", function (req, res) {
  const { gameId } = req.body;
  psqlDB.endActiveGame(gameId).then(
    (data) => {
      res.header("redirectTo", "/");
      res.json(data).status(200);
    },
    (err) => {
      res.sendStatus(err.code || 500);
    }
  );
});

module.exports = gameRouter;
