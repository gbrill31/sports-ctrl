const playersRouter = require("express").Router();
const psqlDB = require("../config/database");

playersRouter.get("/all", (req, res) => {
  psqlDB.getAllPlayers().then(
    (players) => {
      res.json(players).status(200);
    },
    (err) => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Load All Players",
        })
      );
      res.sendStatus(500);
    }
  );
});
playersRouter.get("/team", (req, res) => {
  const { id } = req.query;
  psqlDB.getPlayersByTeam(id).then(
    (players) => {
      res.json(players).status(200);
    },
    (err) => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Load Players For Requested Team",
        })
      );
      res.sendStatus(404);
    }
  );
});

playersRouter.post("/save", function (req, res) {
  const players = req.body;
  if (Array.isArray(players)) {
    psqlDB.addPlayers(players).then(
      (data) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "success",
            message: "Saved added players successfully",
          })
        );
        res.json(data).status(200);
      },
      () => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Save Failed, Could Not Add Players to DB",
          })
        );
        res.sendStatus(404);
      }
    );
  } else {
    psqlDB.updatePlayer(players).then(
      (data) => {
        res.header(
          "notification",
          JSON.stringify({
            type: "success",
            message: "Updated player successfully",
          })
        );
        res.json(data[0]).status(200);
      },
      () => {
        res.header(
          "notification",
          JSON.stringify({
            type: "error",
            message: "Could Not Update Players",
          })
        );
        res.sendStatus(404);
      }
    );
  }
});

playersRouter.post("/delete", function (req, res) {
  const { id } = req.body;
  psqlDB.deletePlayer(id).then(
    () => {
      res.header(
        "notification",
        JSON.stringify({
          type: "success",
          message: "Deleted player successfully",
        })
      );
      res.json(id).status(200);
    },
    () => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Delete Player",
        })
      );
      res.sendStatus(404);
    }
  );
});

playersRouter.post("/statsupdate", function (req, res) {
  const { gameId, playerId, stats } = req.body;
  psqlDB.updatePlayerStats(gameId, playerId, stats).then(
    (newStats) => {
      res.json(newStats).status(200);
    },
    () => {
      res.header(
        "notification",
        JSON.stringify({
          type: "error",
          message: "Could Not Update Player Stats",
        })
      );
      res.sendStatus(404);
    }
  );
});

module.exports = playersRouter;
