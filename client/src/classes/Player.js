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
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getNumber() {
    return this.number;
  }
  getStats() {
    if (this.stats > 1) {
      let lastGameStats = this.stats[0];
      this.stats.forEach(stat => {
        let statDate = Object.keys(stat)[0];
        let lastGameStatDate = Object.keys(lastGameStats)[0];
        if (moment(statDate).isAfter(lastGameStatDate)) {
          lastGameStats = stat;
        }
      });
      return lastGameStats;
    }
    return this.stats[0];
  }
  getStatsDate() {
    return Object.keys(this.getStats())[0];
  }
  getPlayedAgainst() {
    return this.getStats()[this.getStatsDate()].playedAgainst;
  }
  getTotalPoints() {
    return this.getStats()[this.getStatsDate()].data.PT;
  }
  get2FG() {
    return this.getStats()[this.getStatsDate()].data['2FG'];
  }
  get3FG() {
    return this.getStats()[this.getStatsDate()].data['3FG'];
  }
  getFT() {
    return this.getStats()[this.getStatsDate()].data.FT;
  }
  getTotalFouls() {
    return this.getStats()[this.getStatsDate()].data.FOULS;
  }
  getTeamId() {
    return this.teamId;
  }
  getTeamName() {
    return this.team;
  }
}