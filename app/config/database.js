// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;
// const TYPES = require('tedious').TYPES;
// const _ = require('underscore');

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
        database: 'sports-control'
    }
};

const knex = require('knex');

function generateNewGameValues(totalRows) {
    totalRows = totalRows || 30;
    let values = "VALUES ";

    for (let i = 0; i < totalRows; i++) {
        values += i < totalRows - 1 ? "(" + (i + 1) + ",'enter team name'," + (i < (totalRows / 2) ? '\'h\'' : '\'a\'') +
            ",0,'enter player name',0,0,0,0,0)," : "(" + (i + 1) + ",'enter team name','a',0,'enter player name',0,0,0,0,0)";
    }

    return values;
}

function setPlayerToUpdate(player, teamName) {

    player.team = teamName.replace(/\'/g, '\'\'');
    player.name = player.name.replace(/\'/g, '\'\'');

    return player;
}

function tableExists(name) {
    return new Promise((resolve, reject) => {
        request("SELECT * " +
            "FROM information_schema.tables " +
            "WHERE table_name = \'" + name + "\'")
            .then((res) => {
                resolve(res.rowCount > 0);
            });
    });
}

function insertEmptyGameRows() {
    return new Promise((resolve, reject) => {
        request("INSERT INTO game_live " +
            "(id, team, team_loc, number, name, points, fouls, rebounds, assists, blocks) " +
            generateNewGameValues())
            .then((res) => {
                console.log('game table created');
                resolve(res);
            }, (err) => {
                reject(err);
                throw err;
            });
    });
}

function updateTable(table, team) {
    return new Promise((resolve, reject) => {
        let requestPromises = [];
        team.players.forEach((player) => {
            let valuesToUpdate = '', id = 0;
            player = setPlayerToUpdate(player, team.name);
            if (!player.id) {
                let maxId = _.max(team.players, (player) => {
                    return player.id;
                }).id + 1;
                requestPromises.push(request("INSERT INTO game_live " +
                    "(id, team, team_loc, number, name, points, fouls, rebounds, assists, blocks) " +
                    "VALUES (" + maxId + ",\'" + player.team + "\',\'" + player.team_loc + "\'," + player.number + ",\'" + player.name + "\',0,0,0,0,0)"));

            } else {
                Object.keys(player).forEach((key, index, array) => {
                    if (key !== 'id' || key !== 'team') {
                        valuesToUpdate += (key + "=\'" + player[key] + "\'" + (index === array.length - 1 ? '' : ', '));
                    }
                });

                requestPromises.push(request("UPDATE " + table + " SET " + valuesToUpdate +
                    " WHERE id = " + player.id).then(() => {

                    }, (err) => {
                        console.log(err);
                    }));
            }

        });
        Promise.all(requestPromises).then((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        })
    });

}

function request(sqlRequest) {
    return new Promise((resolve, reject) => {
        let request = new Request(sqlRequest, (err, rowCount, rows) => {
            if (err) {
                reject(err);
            } else {
                // console.log(rowCount + ' row(s) inserted', rows);
                resolve({ rowCount: rowCount, rows: rows });
                requests.shift();
                if (requests.length) {
                    psqlDB.execSql(requests[0]);
                }
            }
        });
        requests.push(request);
        if (requests.length >= 0 && requests.length <= 1) {
            psqlDB.execSql(request);
        }

    });
}

function createGamesTable() {
    return new Promise((resolve, reject) => {
        psqlDB.schema.hasTable('games').then((exists) => {
            if (!exists) {
                psqlDB.schema.createTable('games', table => {
                    table.increments();
                    table.string('home');
                    table.string('away');
                    table.string('venue');
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
        })
    });
}

function connect() {
    return new Promise((resolve, reject) => {
        psqlDB = knex(config);

        checkConnection().then((message) => {
            createGamesTable().then(() => {
                resolve(message);
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
    return psqlDB.insert({ home, away, venue }).into('games');
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
        });
    });
}

module.exports = {
    connect,
    checkConnection,
    createGame,
    getAllGames,
    getTeam
};