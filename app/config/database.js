const moment = require('moment');

let DB;

const config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'sportscontrol',
  },
};

const knex = require('knex');

function createUsersTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('users').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('users', (table) => {
            table.increments();
            table.string('name');
            table.string('email');
            table.string('admin'); // The admin owner of operator
            table.string('type'); //Admin or Operator
            table.boolean('firstLogin'); //True only for operators
            table.string('salt');
            table.string('hash');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function createGamesTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('games').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('games', (table) => {
            table.increments();
            table.integer('ownerId');
            table.integer('operatorId');
            table.integer('homeId');
            table.string('home');
            table.integer('homePoints');
            table.integer('homeFouls');
            table.integer('homeTimeouts');
            table.integer('awayId');
            table.string('away');
            table.integer('awayPoints');
            table.integer('awayFouls');
            table.integer('awayTimeouts');
            table.integer('leagueId');
            table.string('venue');
            table.string('status');
            table.boolean('active');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function createLeaguesTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('leagues').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('leagues', (table) => {
            table.increments();
            table.integer('ownerId');
            table.string('name');
            table.string('country');
            table.boolean('isHalves');
            table.integer('quarterStartTime'); //milliseconds
            table.integer('attackStartTime'); //milliseconds
            table.integer('timeoutStartTime'); //milliseconds
            table.integer('maxTimeoutCount');
            table.integer('maxOvertimeTimeoutCount');
            table.integer('maxTeamFoulsCount');
            table.integer('maxPlayerFoulsCount');
            table.integer('maxTechFoulsCount');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function createVenuesTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('venues').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('venues', (table) => {
            table.increments();
            table.integer('ownerId');
            table.string('name');
            table.string('country');
            table.string('city');
            table.integer('seats');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function createTeamsTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('teams').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('teams', (table) => {
            table.increments();
            table.integer('ownerId');
            table.string('name');
            table.string('country');
            table.string('city');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function createPlayersTable() {
  return new Promise((resolve, reject) => {
    DB.schema.hasTable('players').then((exists) => {
      if (!exists) {
        DB.schema
          .createTable('players', (table) => {
            table.increments();
            table.integer('ownerId');
            table.string('name');
            table.integer('number');
            table.string('team');
            table.integer('teamId');
            table.json('stats');
            table.timestamps(false, true);
          })
          .then(
            () => {
              resolve();
            },
            (err) => reject(err)
          );
      } else {
        resolve();
      }
    });
  });
}

function getPlayerStatsData(game, playerTechFouls) {
  return [
    {
      gameDate: moment().format('YYYY-MM-DD'),
      gameId: game ? game.id : null,
      leagueId: game.leagueId,
      playedAgainst: game ? game.name : 'No Games Played',
      data: {
        PT: 0,
        '2FG': 0,
        '3FG': 0,
        FT: 0,
        FOULS: 0,
        TECH_FOULS: playerTechFouls,
        PtLocations: {
          Q1: [],
          Q2: [],
          Q3: [],
          Q4: [],
        },
      },
    },
  ];
}

function setNewGamePlayerStats(player, game) {
  return new Promise((resolve, reject) => {
    let playerTotalTechFouls = 0;
    const gamesFromLeague = player.stats.filter(
      (stats) => stats.leagueId === game.leagueId
    );
    if (gamesFromLeague) {
      gamesFromLeague.forEach((game) => {
        if (game.stats && game.stats.TECH_FOULS)
          playerTotalTechFouls += game.stats.TECH_FOULS;
      });
    }

    DB('players')
      .where('id', player.id)
      .returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
      .update({
        stats: JSON.stringify([
          ...player.stats,
          ...getPlayerStatsData(game, playerTotalTechFouls),
        ]),
        updated_at: new Date(),
      })
      .then(resolve())
      .catch((err) => reject(err));
  });
}

function addGameStatsToPlayers(players, game) {
  const updates = [];
  players.forEach((player) => {
    if (player.stats.length > 1) {
      const gameStats = player.stats.find(
        (g) => g.gameId && g.gameId === game.id
      );
      if (!gameStats) {
        updates.push(setNewGamePlayerStats(player, game));
      }
    } else {
      updates.push(setNewGamePlayerStats(player, game));
    }
  });
  return updates;
}

function getPlayersByTeamId(teamId, game) {
  return new Promise((resolve, reject) => {
    DB.schema
      .hasTable('players')
      .then((exists) => {
        if (exists) {
          DB.select()
            .where('teamId', teamId)
            .table('players')
            .then((players) => {
              if (game) {
                Promise.all(addGameStatsToPlayers(players, game)).then(() => {
                  DB.select()
                    .where('teamId', teamId)
                    .table('players')
                    .then(
                      (updatedPlayers) => {
                        resolve(updatedPlayers);
                      },
                      (err) => reject(err)
                    );
                });
              } else {
                resolve(players);
              }
            })
            .catch((err) => reject(err));
        } else {
          resolve([]);
        }
      })
      .catch((err) => reject(err));
  });
}

function getGameObject(game, players) {
  Object.assign(game, {
    home: {
      id: game.homeId,
      name: game.home,
      players: players[0],
    },
    away: {
      id: game.awayId,
      name: game.away,
      players: players[1],
    },
  });
  return game;
}

function checkConnection() {
  return new Promise((resolve, reject) => {
    DB.raw('SELECT 1')
      .then((message) => {
        resolve(message);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function setHomeTeamScore(game, points) {
  const pointsUpdate =
    game.homePoints + points > 0 ? game.homePoints + points : 0;
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'homePoints', 'homeId'])
      .update({
        homePoints: pointsUpdate,
        updated_at: new Date(),
      })
      .then((teamScore) => {
        resolve({
          teamId: teamScore[0].homeId,
          score: teamScore[0].homePoints,
        });
      })
      .catch((err) => reject(err));
  });
}

function setAwayTeamScore(game, points) {
  const pointsUpdate =
    game.awayPoints + points > 0 ? game.awayPoints + points : 0;
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'awayPoints', 'awayId'])
      .update({
        awayPoints: pointsUpdate,
        updated_at: new Date(),
      })
      .then((teamScore) => {
        resolve({
          teamId: teamScore[0].awayId,
          score: teamScore[0].awayPoints,
        });
      })
      .catch((err) => reject(err));
  });
}

function updateGameScore(gameId, teamId, points) {
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: gameId })
      .asCallback((err, rows) => {
        if (err) return reject(err);
        if (rows && rows.length) {
          const game = rows[0];
          const isHomeTeam = game.homeId === teamId;
          if (isHomeTeam) {
            setHomeTeamScore(game, points)
              .then((teamScore) => resolve(teamScore))
              .catch((err) => reject(err));
          } else {
            setAwayTeamScore(game, points)
              .then((teamScore) => resolve(teamScore))
              .catch((err) => reject(err));
          }
        } else {
          reject(err);
        }
      });
  });
}

function getUpdatedPlayerStats(player, gameId, stats) {
  const statsToUpdate = player.stats.find((game) => game.gameId === gameId);
  const updatedStats = { ...statsToUpdate, data: stats };
  return [
    ...player.stats.filter((game) => game.gameId !== gameId),
    updatedStats,
  ];
}

function resetTeamsFouls(game) {
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .update({
        awayFouls: 0,
        homeFouls: 0,
        updated_at: new Date(),
      })
      .then(() => {
        resolve(game.id);
      })
      .catch((err) => reject(err));
  });
}

function resetTeamsTimeouts(game) {
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .update({
        awayTimeouts: 0,
        homeTimeouts: 0,
        updated_at: new Date(),
      })
      .then(() => {
        resolve(game.id);
      })
      .catch((err) => reject(err));
  });
}

function setHomeTeamTimeouts(game, timeouts) {
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'homeTimeouts', 'homeId'])
      .update({
        homeTimeouts: timeouts,
        updated_at: new Date(),
      })
      .then((teamTimeouts) => {
        resolve({
          teamId: teamTimeouts[0].homeId,
          timeouts: teamTimeouts[0].homeTimeouts,
        });
      })
      .catch((err) => reject(err));
  });
}
function setAwayTeamTimeouts(game, timeouts) {
  return new Promise((resolve, reject) => {
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'awayTimeouts', 'awayId'])
      .update({
        awayTimeouts: timeouts,
        updated_at: new Date(),
      })
      .then((teamTimeouts) => {
        resolve({
          teamId: teamTimeouts[0].awayId,
          timeouts: teamTimeouts[0].awayTimeouts,
        });
      })
      .catch((err) => reject(err));
  });
}

function setHomeTeamFouls(game, fouls) {
  return new Promise((resolve, reject) => {
    const foulsUpdate =
      game.homeFouls + fouls >= 0 ? game.homeFouls + fouls : 0;
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'homeFouls', 'homeId'])
      .update({
        homeFouls: foulsUpdate,
        updated_at: new Date(),
      })
      .then((teamFouls) => {
        resolve({
          teamId: teamFouls[0].homeId,
          fouls: teamFouls[0].homeFouls,
        });
      })
      .catch((err) => reject(err));
  });
}

function setAwayTeamFouls(game, fouls) {
  return new Promise((resolve, reject) => {
    const foulsUpdate =
      game.awayFouls + fouls >= 0 ? game.awayFouls + fouls : 0;
    DB('games')
      .where({ id: game.id })
      .returning(['id', 'awayFouls', 'awayId'])
      .update({
        awayFouls: foulsUpdate,
        updated_at: new Date(),
      })
      .then((teamFouls) => {
        resolve({
          teamId: teamFouls[0].awayId,
          fouls: teamFouls[0].awayFouls,
        });
      })
      .catch((err) => reject(err));
  });
}

//Exported functions

const DB_EXPORTS = {
  checkConnection,

  createUser: function (user) {
    return DB.insert({ ...user }, [
      'name',
      'email',
      'admin',
      'type',
      'firstLogin',
      'salt',
      'hash',
    ]).into('users');
  },
  updateUser: function (user) {
    return DB('users').where('id', user.id).update({
      name: user.name,
      email: user.email,
      salt: user.salt,
      hash: user.hash,
    });
  },
  deleteUsers: function (ids) {
    return DB('users').whereIn('id', ids).del();
  },
  updatePassword: function (user, salt, hash) {
    return DB('users')
      .where('id', user.id)
      .update({ salt, hash, firstLogin: false });
  },

  findUser: function (email) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('users').then(
        (exists) => {
          if (exists) {
            DB.select()
              .table('users')
              .where('email', email)
              .then(
                (user) => {
                  resolve(user[0]);
                },
                (err) => {
                  reject(err);
                }
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },
  findUserById: function (id) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('users').then(
        (exists) => {
          if (exists) {
            DB.select()
              .table('users')
              .where('id', id)
              .then(
                (user) => {
                  resolve(user[0]);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },
  findUsersByAdminId: function (id) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('users').then(
        (exists) => {
          if (exists) {
            DB.select(
              'id',
              'name',
              'email',
              'type',
              'admin',
              'firstLogin',
              'created_at'
            )
              .table('users')
              .where('admin', id)
              .then(
                (users) => {
                  resolve(users);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },

  connect: function () {
    return new Promise((resolve, reject) => {
      DB = knex(config);

      checkConnection()
        .then(() => {
          Promise.all([
            createUsersTable(),
            createGamesTable(),
            createVenuesTable(),
            createLeaguesTable(),
            createTeamsTable(),
            createPlayersTable(),
          ]).then(
            () => {
              resolve();
            },
            (err) => {
              reject(err);
            }
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createGame: function (
    ownerId,
    operatorId,
    home,
    homeId,
    away,
    awayId,
    venue,
    leagueId,
    active
  ) {
    return new Promise((resolve, reject) => {
      DB.returning([
        'id',
        'home',
        'homeId',
        'homePoints',
        'homeFouls',
        'homeTimeouts',
        'awayTimeouts',
        'away',
        'awayId',
        'awayPoints',
        'awayFouls',
        'venue',
        'leagueId',
        'status',
      ])
        .insert({
          ownerId,
          operatorId,
          home,
          homeId,
          homePoints: 0,
          homeFouls: 0,
          homeTimeouts: 0,
          awayTimeouts: 0,
          away,
          awayId,
          awayPoints: 0,
          awayFouls: 0,
          venue,
          leagueId,
          active,
          status: 'Q1',
        })
        .into('games')
        .asCallback(function (err, rows) {
          if (err) reject(err);
          if (rows && rows.length) {
            const game = rows[0];
            Promise.all([
              getPlayersByTeamId(game.homeId, {
                id: game.id,
                leagueId,
                name: `Against ${away}`,
              }),
              getPlayersByTeamId(game.awayId, {
                id: game.id,
                leagueId,
                name: `Against ${home}`,
              }),
            ]).then(
              (players) => {
                resolve(getGameObject(game, players));
              },
              (err) => reject(err)
            );
          } else {
            resolve(null);
          }
        });
    });
  },

  getActiveGame: function (ownerId) {
    return new Promise((resolve, reject) => {
      DB.select()
        .from('games')
        .where({ active: true, ownerId })
        .asCallback(function (err, rows) {
          if (err) reject(err);
          if (rows && rows.length) {
            const game = rows[0];
            Promise.all([
              getPlayersByTeamId(game.homeId, {
                id: game.id,
                name: `Against ${game.away}`,
              }),
              getPlayersByTeamId(game.awayId, {
                id: game.id,
                name: `Against ${game.home}`,
              }),
            ]).then(
              (teamsData) => {
                resolve(getGameObject(game, teamsData));
              },
              (err) => reject(err)
            );
          } else {
            resolve(null);
          }
        });
    });
  },

  updateGameScore,

  getAllGames: function (ownerId) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('games').then(
        (exists) => {
          if (exists) {
            DB.select()
              .from('games')
              .where('ownerId', ownerId)
              .then(
                (games) => {
                  resolve(games);
                },
                (err) => {
                  reject(err);
                }
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },

  createLeague: function (
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
  ) {
    return DB.insert(
      {
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
        ownerId: userId,
      },
      [
        'id',
        'name',
        'country',
        'isHalves',
        'quarterStartTime',
        'attackStartTime',
        'timeoutStartTime',
        'maxTimeoutCount',
        'maxOvertimeTimeoutCount',
        'maxTeamFoulsCount',
        'maxPlayerFoulsCount',
        'maxTechFoulsCount',
      ]
    ).into('leagues');
  },

  updateLeague: function (
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
  ) {
    return DB('leagues')
      .where('id', id)
      .returning([
        'id',
        'name',
        'country',
        'isHalves',
        'quarterStartTime',
        'timeoutStartTime',
        'attackStartTime',
        'maxTimeoutCount',
        'maxOvertimeTimeoutCount',
        'maxTeamFoulsCount',
        'maxPlayerFoulsCount',
        'maxTechFoulsCount',
      ])
      .update({
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
        updated_at: new Date(),
      });
  },

  deleteLeague: function (id) {
    return DB('leagues').where('id', id).del();
  },

  getAllLeagues: function (ownerId) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('leagues').then(
        (exists) => {
          if (exists) {
            DB.select()
              .from('leagues')
              .where('ownerId', ownerId)
              .then(
                (leagues) => {
                  resolve(leagues);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },
  getLeagueById: function (id) {
    return DB.select().table('leagues').where('id', id);
  },

  createVenue: function (name, country, city, seats, userId) {
    return DB.insert({ name, country, city, seats, ownerId: userId }, [
      'id',
      'name',
      'country',
      'city',
      'seats',
    ]).into('venues');
  },

  updateVenue: function (id, name, country, city, seats) {
    return DB('venues')
      .where('id', id)
      .returning(['id', 'name', 'country', 'city', 'seats'])
      .update({ name, country, city, seats, updated_at: new Date() });
  },

  deleteVenue: function (id) {
    return DB('venues').where('id', id).del();
  },

  getAllVenues: function (ownerId) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('venues').then(
        (exists) => {
          if (exists) {
            DB.select()
              .from('venues')
              .where('ownerId', ownerId)
              .then(
                (venues) => {
                  resolve(venues);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },

  getAllTeams: function (ownerId) {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('teams').then(
        (exists) => {
          if (exists) {
            DB.select()
              .from('teams')
              .where('ownerId', ownerId)
              .then(
                (teams) => {
                  resolve(teams);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },
  getTeamById: function (id) {
    return DB.select().table('teams').where('id', id);
  },

  createTeam: function (name, country, city, userId) {
    return DB.returning(['id', 'name', 'country', 'city'])
      .insert({ name, country, city, ownerId: userId })
      .into('teams');
  },

  updateTeam: function (id, name, country, city) {
    return DB('teams')
      .where('id', id)
      .returning(['id', 'name', 'country', 'city'])
      .update({ name, country, city, updated_at: new Date() });
  },

  deleteTeam: function (id) {
    return DB('teams').where('id', id).del();
  },

  getAllPlayers: function () {
    return new Promise((resolve, reject) => {
      DB.schema.hasTable('players').then(
        (exists) => {
          if (exists) {
            DB.select()
              .table('players')
              .then(
                (players) => {
                  resolve(players);
                },
                (err) => reject(err)
              );
          } else {
            resolve();
          }
        },
        (err) => reject(err)
      );
    });
  },

  getPlayersByTeam: getPlayersByTeamId,

  addPlayers: function (players, userId) {
    players.forEach((player) => {
      Object.assign(player, {
        stats: JSON.stringify(getPlayerStatsData()),
        ownerId: userId,
      });
    });
    return DB.returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
      .insert(players)
      .into('players');
  },

  updatePlayer: function ({ id, name, number, team, teamId }) {
    return DB('players')
      .where('id', id)
      .returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
      .update({ name, number, team, teamId, updated_at: new Date() });
  },
  deletePlayer: function (id) {
    return DB('players').where('id', id).del();
  },
  updatePlayerStats: function (gameId, playerId, stats) {
    return new Promise((resolve, reject) => {
      DB('players')
        .where('id', playerId)
        .select()
        .asCallback((err, rows) => {
          if (err) reject(err);
          if (rows && rows.length) {
            const player = rows[0];
            DB('players')
              .where('id', playerId)
              .returning(['id', 'stats', 'teamId'])
              .update({
                stats: JSON.stringify(
                  getUpdatedPlayerStats(player, gameId, stats)
                ),
                updated_at: new Date(),
              })
              .then((player) => {
                resolve(player[0]);
              })
              .catch((err) => reject(err));
          } else {
            reject(err);
          }
        });
    });
  },
  updateGameStatus: function (gameId, status) {
    return DB('games')
      .where({ id: gameId })
      .returning('status')
      .update({ status, updated_at: new Date() });
  },
  updateTeamFouls: function (gameId, teamId, fouls) {
    return new Promise((resolve, reject) => {
      DB('games')
        .where({ id: gameId })
        .asCallback((err, rows) => {
          if (err) reject(err);
          if (rows && rows.length) {
            const game = rows[0];
            if (teamId) {
              const isHomeTeam = game.homeId === teamId;
              if (isHomeTeam) {
                setHomeTeamFouls(game, fouls)
                  .then((teamFouls) => resolve(teamFouls))
                  .catch((err) => reject(err));
              } else {
                setAwayTeamFouls(game, fouls)
                  .then((teamFouls) => resolve(teamFouls))
                  .catch((err) => reject(err));
              }
            } else {
              resetTeamsFouls(game)
                .then((id) => resolve(id))
                .catch((err) => reject(err));
            }
          } else {
            reject(err);
          }
        });
    });
  },
  updateTeamTimeouts: function (gameId, teamId, timeouts) {
    return new Promise((resolve, reject) => {
      DB('games')
        .where({ id: gameId })
        .asCallback((err, rows) => {
          if (err) reject(err);
          if (rows && rows.length) {
            const game = rows[0];
            if (teamId) {
              const isHomeTeam = game.homeId === teamId;
              if (isHomeTeam) {
                setHomeTeamTimeouts(game, timeouts)
                  .then((teamTimeouts) => resolve(teamTimeouts))
                  .catch((err) => reject(err));
              } else {
                setAwayTeamTimeouts(game, timeouts)
                  .then((teamTimeouts) => resolve(teamTimeouts))
                  .catch((err) => reject(err));
              }
            } else {
              resetTeamsTimeouts(game)
                .then((id) => resolve(id))
                .catch((err) => reject(err));
            }
          } else {
            reject(err);
          }
        });
    });
  },
  endActiveGame: function (gameId) {
    return DB('games')
      .where({ id: gameId })
      .update({ active: false, updated_at: new Date() });
  },
};

module.exports = DB_EXPORTS;
