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
                    table.string('home');
                    table.integer('homeId');
                    table.string('away');
                    table.integer('awayId');
                    table.string('venue');
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

//Exported functions

function getPlayersByTeam(teamId) {
    return new Promise((resolve, reject) => {
        DB.schema.hasTable('players').then((exists) => {
            if (exists) {
                DB
                    .select()
                    .where('teamId', teamId)
                    .table('players').then((players) => {
                        resolve(players)
                    }, err => reject(err));
            } else {
                resolve();
            }
        }, err => reject(err));
    });
}

const DB_EXPORTS = {
    checkConnection: function () {
        return new Promise((resolve, reject) => {
            DB.raw('SELECT 1').then((message) => {
                resolve(message);
            }).catch((err) => {
                reject(err);
            });
        });
    },

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
                .returning(['id', 'home', 'homeId', 'away', 'awayId', 'venue'])
                .insert({ home, homeId, away, awayId, venue, active })
                .into('games')
                .asCallback(function (err, rows) {
                    if (err) reject(err);
                    if (rows.length) {
                        const game = rows[0];
                        Promise.all([
                            getPlayersByTeam(game.homeId),
                            getPlayersByTeam(game.awayId)
                        ]).then((data) => {
                            Object.assign(game, {
                                homePlayers: data[0],
                                awayPlayers: data[1]
                            });
                            resolve(game);
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
                .returning(['id', 'home', 'homeId', 'away', 'awayId', 'venue'])
                .where('active', true)
                .asCallback(function (err, rows) {
                    if (err) reject(err);
                    if (rows.length) {
                        const game = rows[0];
                        Promise.all([
                            getPlayersByTeam(game.homeId),
                            getPlayersByTeam(game.awayId)
                        ]).then((data) => {
                            Object.assign(game, {
                                homePlayers: data[0],
                                awayPlayers: data[1]
                            });
                            resolve(game);
                        }, err => reject(err));
                    } else {
                        resolve(null);
                    }
                });
        });

    },

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

    getPlayersByTeam: getPlayersByTeam,

    addPlayers: function (players) {
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
    }
}

module.exports = DB_EXPORTS;