const connectionConfig = {
    attempts: 3
};

let psqlDB, connectionAttempts = 0, requests = [];

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
        psqlDB.schema.hasTable('games').then((exists) => {
            if (!exists) {
                psqlDB.schema.createTable('games', table => {
                    table.increments();
                    table.string('home');
                    table.string('away');
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
        psqlDB.schema.hasTable('venues').then((exists) => {
            if (!exists) {
                psqlDB.schema.createTable('venues', table => {
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
        psqlDB.schema.hasTable('teams').then((exists) => {
            if (!exists) {
                psqlDB.schema.createTable('teams', table => {
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
        psqlDB.schema.hasTable('players').then((exists) => {
            if (!exists) {
                psqlDB.schema.createTable('players', table => {
                    table.increments();
                    table.string('name');
                    table.integer('number');
                    table.string('team');
                    table.integer('team_id');
                    table.jsonb('stats');
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

function checkConnection() {
    return new Promise((resolve, reject) => {
        psqlDB.raw('SELECT 1').then((message) => {
            resolve(message);
        }).catch((err) => {
            reject(err);
        });
    });
}

function connect() {
    return new Promise((resolve, reject) => {
        psqlDB = knex(config);

        checkConnection().then(() => {
            Promise.all([
                createGamesTable(),
                createVenuesTable(),
                createTeamsTable(),
                createPlayersTable()
            ])
                .then(() => {
                    resolve();
                }, err => reject(err));
        }).catch((err) => {
            reject(err);
        })
    });
}

function getTeam(team) {
    return new Promise((resolve, reject) => {

    });
}

function createGame(home, away, venue) {
    return psqlDB.insert({ home, away, venue }, ['id', 'home', 'away', 'venue']).into('games');
}

function getAllGames() {
    return new Promise((resolve, reject) => {
        psqlDB.schema.hasTable('games').then((exists) => {
            if (exists) {
                psqlDB.select().table('games').then((games) => {
                    resolve(games)
                }, err => reject(err));
            } else {
                resolve();
            }
        }, err => reject(err));
    });
}

function createVenue(name, country, city, seats) {
    return psqlDB
        .insert({ name, country, city, seats }, ['id', 'name', 'country', 'city', 'seats'])
        .into('venues');
}

function updateVenue(id, name, country, city, seats) {
    return psqlDB('venues')
        .where('id', id)
        .returning(['id', 'name', 'country', 'city', 'seats'])
        .update({ name, country, city, seats, 'updated_at': new Date() });
}

function deleteVenue(id) {
    return psqlDB('venues')
        .where('id', id)
        .del();
}

function getAllVenues() {
    return new Promise((resolve, reject) => {
        psqlDB.schema.hasTable('venues').then((exists) => {
            if (exists) {
                psqlDB.select().table('venues').then((venues) => {
                    resolve(venues)
                }, err => reject(err));
            } else {
                resolve();
            }
        }, err => reject(err));
    });
}

function getAllTeams() {
    return new Promise((resolve, reject) => {
        psqlDB.schema.hasTable('teams').then((exists) => {
            if (exists) {
                psqlDB.select().table('teams').then((teams) => {
                    resolve(teams)
                }, err => reject(err));
            } else {
                resolve();
            }
        }, err => reject(err));
    });
}

function createTeam(name, league, country, city) {
    return psqlDB
        .returning(['id', 'name', 'league', 'country', 'city'])
        .insert({ name, league, country, city })
        .into('teams');
}

function updateTeam(id, name, league, country, city) {
    return psqlDB('teams')
        .where('id', id)
        .returning(['id', 'name', 'league', 'country', 'city'])
        .update({ name, league, country, city, 'updated_at': new Date() });
}

function deleteTeam(id) {
    return psqlDB('teams')
        .where('id', id)
        .del();
}


module.exports = {
    connect,
    checkConnection,
    createGame,
    getAllGames,
    getTeam,
    getAllVenues,
    createVenue,
    updateVenue,
    deleteVenue,
    getAllTeams,
    createTeam,
    updateTeam,
    deleteTeam
};