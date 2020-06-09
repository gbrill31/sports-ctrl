import moment from 'moment';

/**
name: "player name",
number: "jursey number",
"team": "playing for team name",
stats: [
  {
    "game date":{
      "playedAgainst": "team name",
      "data":{
        "PT": "points in game",
        "2FG": "number of 2 points shots scored",
        "3FG": "number of 3 points shots scored",
        "FT": "number of free throws shots scored",
        "Fouls": "number of fouls made"
      }
    }
  }
]
 */

export default class Player {
  constructor(data) {
    Object.assign(this, data);
    if (data.stats.length > 1) {
      this.lastGameStats = data.stats.sort((statA, statB) =>
        moment(Object.keys(statA)[0]).isAfter(Object.keys(statB)[0]) ? -1 : 1)[0];
    } else {
      this.lastGameStats = data.stats[0];
    }
    this.lastGameStatsDate = Object.keys(this.lastGameStats)[0];
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name.toLowerCase();
  }
  getNumber() {
    return this.number;
  }
  getStats(id) {
    if (!id) {
      return this.lastGameStats;
    }
    return this.stats.filter(game => game[Object.keys(game)].gameId === id)[0];
  }
  getStatsDate() {
    return this.lastGameStatsDate;
  }
  updateStats(data) {
    this.stats = data;
    return this;
  }
  getPlayedAgainst(id) {
    return this.getStats(id)[this.getStatsDate()].playedAgainst;
  }
  getTotalPoints(id) {
    return this.getStats(id)[this.getStatsDate()].data.PT;
  }
  get2FG(id) {
    return this.getStats(id)[this.getStatsDate()].data['2FG'];
  }
  get3FG(id) {
    return this.getStats(id)[this.getStatsDate()].data['3FG'];
  }
  getFT(id) {
    return this.getStats(id)[this.getStatsDate()].data.FT;
  }
  getTotalFouls(id) {
    return this.getStats(id)[this.getStatsDate()].data.FOULS;
  }
  getTeamId() {
    return this.teamId;
  }
  getTeamName() {
    return this.team;
  }
}