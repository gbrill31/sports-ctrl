const moment = require('moment');

const connectionConfig = {
    attempts: 3
};

let DB, connectionAttempts = 0, requests = [];

const config = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: '',
        password: '',
        database: 'sportscontrol'
    }
};

const knex = require('knex');


function createGamesTable() {
    return new Promise((resolve, reject) => {
        DB.schema.hasTable('games').then((exists) => {
            if (!exists) {
                DB.schema.createTable('games', table => {
                    table.increments();
                    table.integer('homeId');
                    table.string('home');
                    table.integer('homePoints');
                    table.integer('homeFouls');
                    table.integer('awayId');
                    table.string('away');
                    table.integer('awayPoints');
                    table.integer('awayFouls');
                    table.string('venue');
                    table.string('status');
                    table.boolean('active');
                    table.timestamps(false, true);
                }).then(() => {
                    resolve();
                }, err => reject(err));
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
                DB.schema.createTable('venues', table => {
                    table.increments();
                    table.string('name');
                    table.string('country');
                    table.string('city');
                    table.integer('seats');
                    table.timestamps(false, true);
                }).then(() => {
                    resolve();
                }, err => reject(err));
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
                DB.schema.createTable('teams', table => {
                    table.increments();
                    table.string('name');
                    table.string('league');
                    table.string('country');
                    table.string('city');
                    table.timestamps(false, true);
                }).then(() => {
                    resolve();
                }, err => reject(err));
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
                DB.schema.createTable('players', table => {
                    table.increments();
                    table.string('name');
                    table.integer('number');
                    table.string('team');
                    table.integer('teamId');
                    table.json('stats');
                    table.timestamps(false, true);
                }).then(() => {
                    resolve();
                }, err => reject(err));
            } else {
                resolve();
            }
        });
    });
}

function getInitialPlayerStats(game) {
    const initialStats = {};
    initialStats[moment().format('YYYY-MM-DD')] = {
        gameId: game ? game.id : null,
        playedAgainst: game ? game.name : 'No Games Played',
        data: {
            PT: 0,
            "2FG": 0,
            "3FG": 0,
            FT: 0,
            FOULS: 0,
            PtLocations: {
                Q1: [],
                Q2: [],
                Q3: [],
                Q4: []
            }
        }
    };
    return [initialStats];
}

function setNewGamePlayerStats(player, game) {
    return DB('players')
        .where('id', player.id)
        .returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
        .update({
            stats: JSON.stringify([...player.stats, ...getInitialPlayerStats(game)]),
            'updated_at': new Date()
        });
}

function getPlayersByTeamId(teamId, game) {
    return new Promise((resolve, reject) => {
        DB.schema.hasTable('players').then((exists) => {
            if (exists) {
                DB.select()
                    .where('teamId', teamId)
                    .table('players')
                    .then((players) => {
                        if (game) {
                            const updates = [];
                            players.forEach(player => updates.push(setNewGamePlayerStats(player, game)));
                            Promise.all(updates).then(() => {
                                DB.select()
                                    .where('teamId', teamId)
                                    .table('players').then((updatedPlayers) => {
                                        resolve(updatedPlayers);
                                    }, err => reject(err));
                            });
                        } else {
                            resolve(players);
                        }
                    }, err => reject(err));
            } else {
                resolve([]);
            }
        }, err => reject(err));
    });
}

function getGameObject(game, data) {
    Object.assign(game, {
        home: {
            id: game.homeId,
            name: game.home,
            players: data[0]
        },
        away: {
            id: game.awayId,
            name: game.away,
            players: data[1]
        }
    });
    return game;
}

function checkConnection() {
    return new Promise((resolve, reject) => {
        DB.raw('SELECT 1').then((message) => {
            resolve(message);
        }).catch((err) => {
            reject(err);
        });
    });
}

function updateGameScore(gameId, teamId, points) {
    return new Promise((resolve, reject) => {
        DB('games')
            .where({ id: gameId })
            .asCallback((err, rows) => {
                if (err) reject(err);

                const game = rows[0];
                const isHomeTeam = game.homeId === teamId;
                if (isHomeTeam) {
                    const pointsUpdate = game.homePoints + points > 0 ? game.homePoints + points : 0;
                    DB('games')
                        .where({ id: gameId })
                        .returning(['id', 'homePoints', 'homeId'])
                        .update({
                            homePoints: pointsUpdate,
                            'updated_at': new Date()
                        })
                        .then((teamScore) => {
                            resolve({
                                teamId: teamScore[0].homeId,
                                score: teamScore[0].homePoints
                            })
                        })
                        .catch(err => reject(err));
                } else {
                    const pointsUpdate = game.awayPoints + points > 0 ? game.awayPoints + points : 0;
                    DB('games')
                        .where({ id: gameId })
                        .returning(['id', 'awayPoints', 'awayId'])
                        .update({
                            awayPoints: pointsUpdate,
                            'updated_at': new Date()
                        })
                        .then((teamScore) => {
                            resolve({
                                teamId: teamScore[0].awayId,
                                score: teamScore[0].awayPoints
                            })
                        })
                        .catch(err => reject(err));
                }
            });
    });
}

//Exported functions



const DB_EXPORTS = {
    checkConnection,

    connect: function () {
        return new Promise((resolve, reject) => {
            DB = knex(config);

            checkConnection().then(() => {
                Promise.all([
                    createGamesTable(),
                    createVenuesTable(),
                    createTeamsTable(),
                    createPlayersTable()
                ])
                    .then(() => {
                        resolve();
                    }, err => {
                        reject(err)
                    });
            }).catch((err) => {
                reject(err);
            })
        });
    },

    createGame: function (home, homeId, away, awayId, venue, active) {
        return new Promise((resolve, reject) => {
            DB
                .returning([
                    'id', 'home', 'homeId', 'homePoints', 'homeFouls', 'away', 'awayId',
                    'awayPoints', 'awayFouls', 'venue', 'status'
                ])
                .insert({
                    home, homeId, homePoints: 0, homeFouls: 0, away, awayId,
                    awayPoints: 0, awayFouls: 0, venue, active, status: 'Q1'
                })
                .into('games')
                .asCallback(function (err, rows) {
                    if (err) reject(err);
                    if (rows.length) {
                        const game = rows[0];
                        Promise.all([
                            getPlayersByTeamId(game.homeId, { id: game.id, name: `Against ${away}` }),
                            getPlayersByTeamId(game.awayId, { id: game.id, name: `Against ${home}` })
                        ]).then((data) => {
                            resolve(getGameObject(game, data));
                        }, err => reject(err));
                    } else {
                        resolve(null);
                    }
                });
        })
    },

    getActiveGame: function () {
        return new Promise((resolve, reject) => {
            DB.select().from('games')
                .where('active', true)
                .asCallback(function (err, rows) {
                    if (err) reject(err);
                    if (rows && rows.length) {
                        const game = rows[0];
                        Promise.all([
                            getPlayersByTeamId(game.homeId),
                            getPlayersByTeamId(game.awayId)
                        ]).then((teamsData) => {
                            resolve(getGameObject(game, teamsData));
                        }, err => reject(err));
                    } else {
                        resolve(null);
                    }
                });
        });

    },

    updateGameScore,


    getAllGames: function () {
        return new Promise((resolve, reject) => {
            DB.schema.hasTable('games').then((exists) => {
                if (exists) {
                    DB.select().table('games').then((games) => {
                        resolve(games)
                    }, err => reject(err));
                } else {
                    resolve();
                }
            }, err => reject(err));
        });
    },

    createVenue: function (name, country, city, seats) {
        return DB
            .insert({ name, country, city, seats }, ['id', 'name', 'country', 'city', 'seats'])
            .into('venues');
    },

    updateVenue: function (id, name, country, city, seats) {
        return DB('venues')
            .where('id', id)
            .returning(['id', 'name', 'country', 'city', 'seats'])
            .update({ name, country, city, seats, 'updated_at': new Date() });
    },

    deleteVenue: function (id) {
        return DB('venues')
            .where('id', id)
            .del();
    },

    getAllVenues: function () {
        return new Promise((resolve, reject) => {
            DB.schema.hasTable('venues').then((exists) => {
                if (exists) {
                    DB.select().table('venues').then((venues) => {
                        resolve(venues)
                    }, err => reject(err));
                } else {
                    resolve();
                }
            }, err => reject(err));
        });
    },

    getAllTeams: function () {
        return new Promise((resolve, reject) => {
            DB.schema.hasTable('teams').then((exists) => {
                if (exists) {
                    DB.select().table('teams').then((teams) => {
                        resolve(teams)
                    }, err => reject(err));
                } else {
                    resolve();
                }
            }, err => reject(err));
        });
    },

    createTeam: function (name, league, country, city) {
        return DB
            .returning(['id', 'name', 'league', 'country', 'city'])
            .insert({ name, league, country, city })
            .into('teams');
    },

    updateTeam: function (id, name, league, country, city) {
        return DB('teams')
            .where('id', id)
            .returning(['id', 'name', 'league', 'country', 'city'])
            .update({ name, league, country, city, 'updated_at': new Date() });
    },

    deleteTeam: function (id) {
        return DB('teams')
            .where('id', id)
            .del();
    },

    getAllPlayers: function () {
        return new Promise((resolve, reject) => {
            DB.schema.hasTable('players').then((exists) => {
                if (exists) {
                    DB.select().table('players').then((players) => {
                        resolve(players)
                    }, err => reject(err));
                } else {
                    resolve();
                }
            }, err => reject(err));
        });
    },

    getPlayersByTeam: getPlayersByTeamId,

    addPlayers: function (players) {
        players.forEach((player) => {
            Object.assign(player, { stats: JSON.stringify(getInitialPlayerStats()) });
        });
        return DB
            .returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
            .insert(players)
            .into('players');
    },

    updatePlayer: function ({ id, name, number, team, teamId }) {
        return DB('players')
            .where('id', id)
            .returning(['id', 'name', 'number', 'team', 'teamId', 'stats'])
            .update({ name, number, team, teamId, 'updated_at': new Date() });
    },
    deletePlayer: function (id) {
        return DB('players')
            .where('id', id)
            .del();
    },
    updatePlayerStats: function (gameId, playerId, stats) {
        return new Promise((resolve, reject) => {
            DB('players')
                .where('id', playerId)
                .select()
                .asCallback((err, rows) => {
                    if (err) reject(err);
                    const player = rows[0];
                    const statsToUpdate = player.stats.find(game => game[Object.keys(game)].gameId === gameId);
                    const updatedStats = { ...statsToUpdate[Object.keys(statsToUpdate)], data: stats };
                    const newStatsArray = [
                        ...player.stats.filter(game => game[Object.keys(game)].gameId !== gameId),
                        {
                            [Object.keys(statsToUpdate)[0]]: updatedStats
                        }
                    ];

                    DB('players')
                        .where('id', playerId)
                        .returning(['id', 'stats', 'teamId'])
                        .update({
                            stats: JSON.stringify(newStatsArray),
                            'updated_at': new Date()
                        })
                        .then((player) => {
                            resolve(player[0]);
                        })
                        .catch(err => reject(err));
                });
        })
    },
    updateGameStatus: function (gameId, status) {
        return DB('games')
            .where({ id: gameId })
            .returning('status')
            .update({ status, 'updated_at': new Date() });
    },
    updateTeamFouls: function (gameId, teamId, fouls) {
        return new Promise((resolve, reject) => {
            DB('games')
                .where({ id: gameId })
                .asCallback((err, rows) => {
                    if (err) reject(err);

                    const game = rows[0];
                    if (teamId) {
                        const isHomeTeam = game.homeId === teamId;
                        if (isHomeTeam) {
                            const foulsUpdate = game.homeFouls + fouls >= 0 ? game.homeFouls + fouls : 0;
                            DB('games')
                                .where({ id: gameId })
                                .returning(['id', 'homeFouls', 'homeId'])
                                .update({
                                    homeFouls: foulsUpdate,
                                    'updated_at': new Date()
                                })
                                .then((teamFouls) => {
                                    resolve({
                                        teamId: teamFouls[0].homeId,
                                        fouls: teamFouls[0].homeFouls
                                    })
                                })
                                .catch(err => reject(err));
                        } else {
                            const foulsUpdate = game.awayFouls + fouls >= 0 ? game.awayFouls + fouls : 0
                            DB('games')
                                .where({ id: gameId })
                                .returning(['id', 'awayFouls', 'awayId'])
                                .update({
                                    awayFouls: foulsUpdate,
                                    'updated_at': new Date()
                                })
                                .then((teamFouls) => {
                                    resolve({
                                        teamId: teamFouls[0].awayId,
                                        fouls: teamFouls[0].awayFouls
                                    })
                                })
                                .catch(err => reject(err));
                        }
                    } else {
                        DB('games')
                            .where({ id: gameId })
                            .update({
                                awayFouls: 0,
                                homeFouls: 0,
                                'updated_at': new Date()
                            })
                            .then(() => {
                                resolve(gameId);
                            })
                            .catch(err => reject(err));
                    }
                });
        });
    }


}

module.exports = DB_EXPORTS;