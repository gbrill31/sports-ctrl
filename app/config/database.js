// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;
// const TYPES = require('tedious').TYPES;
// const _ = require('underscore');

const connectionConfig = {
    attempts: 3
};

let sqlDB, connectionAttempts = 0, requests = [];

const config = {
    server: "192.168.14.25",
    authentication: {
        type: 'default',
        options: {
            userName: "sa",
            password: "!password"
        }
    },
    options: {
        database: 'stats',
        encrypt: false,
        rowCollectionOnRequestCompletion: true
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
                    sqlDB.execSql(requests[0]);
                }
            }
        });
        requests.push(request);
        if (requests.length >= 0 && requests.length <= 1) {
            sqlDB.execSql(request);
        }

    });
}

//Exported functions

function connect() {
    return new Promise((resolve, reject) => {
        sqlDB = knex({
            client: 'mssql',
            connection: {
                host: '192.168.0.24',
                user: 'sa',
                password: '!password',
                database: 'sports'
            },
            asyncStackTraces: true
        });

        checkConnection().then((message) => {
            resolve(message);
        }).catch((err) => {
            reject(err);
        })
    });
}

function checkConnection() {
    return new Promise((resolve, reject) => {
        sqlDB.raw('SELECT 1').then((message) => {
            resolve(message);
        }).catch((err) => {
            reject(err);
        })
    });
}

function gameTableExists() {
    return tableExists('game_live');
}

function createGameTable(isClear = false) {
    return new Promise((resolve, reject) => {
        gameTableExists().then((isTableExists) => {
            if (!isTableExists) {
                request('CREATE TABLE game_live(' +
                    '[id] [int],' +
                    '[team] [varchar](150),' +
                    '[team_loc] [char](1),' +
                    '[number] [int],' +
                    '[name] [varchar](100),' +
                    '[points] [int],' +
                    '[fouls] [int],' +
                    '[rebounds] [int],' +
                    '[assists] [int],' +
                    '[blocks] [int]' +
                    ')')
                    .then(() => {
                        insertEmptyGameRows().then((res) => {
                            resolve(res);
                        }, (err) => {
                            reject(err);
                        });
                    }, (err) => {
                        reject(err);
                        throw err;
                    });
            } else if (isClear) {
                request('DELETE FROM game_live WHERE name <> \'empty\'').then(() => {
                    console.log('game table cleared');
                    insertEmptyGameRows().then((res) => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
                }, (err) => {
                    reject(err);
                    console.log(err.message);
                });
            }
        });
    });
}

function updateTeam(data) {
    return updateTable('game_live', data);
}

function getTeam(team) {
    return new Promise((resolve, reject) => {
        request("SELECT * from game_live WHERE team=\'" + team.name + "\' OR team_loc=\'" + team.location + "\'")
            .then((res) => {
                resolve(_.map(res.rows, (row) => {
                    let item = {};
                    _.each(row, (r) => {
                        item[r.metadata.colName] = r.value;
                    });
                    return item;
                }));
            }, (err) => {
                reject(err);
            });
    });
}

module.exports = {
    connect: connect,
    checkConnection: checkConnection,
    newGame: createGameTable,
    hasGame: gameTableExists,
    getTeam: getTeam,
    updateTeam: updateTeam
};