export default class Player {
  constructor(data) {
    Object.assign(this, data);
    if (data.stats) {
      if (data.stats.length > 1) {
        this.lastGameStats = data.stats.sort((statA, statB) =>
          statA.gameId > statB.gameId ? -1 : 1
        )[0];
      } else {
        this.lastGameStats = data.stats[0];
      }
      this.lastGameStatsDate = this.lastGameStats.gameDate;
    }
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name.toLowerCase();
  }
  getNumber() {
    return this.number.toString();
  }
  getStats(id) {
    if (!id) {
      return this.lastGameStats;
    }
    return this.stats.find((game) => game.gameId === id);
  }
  getStatsData(id) {
    if (!id) {
      return this.lastGameStats.data;
    }
    const foundStats = this.stats.find((game) => game.gameId === id);
    return foundStats ? foundStats.data : {};
  }
  getLastStatsDate() {
    return this.lastGameStatsDate;
  }
  updateStats(data) {
    this.stats = data;
    return this;
  }
  getPlayedAgainst(id) {
    return this.getStats(id).playedAgainst;
  }
  getTotalPoints(id) {
    return this.getStats(id).data.PT;
  }
  get2FG(id) {
    return this.getStats(id).data['2FG'];
  }
  get3FG(id) {
    return this.getStats(id).data['3FG'];
  }
  getFT(id) {
    return this.getStats(id).data.FT;
  }
  getTotalFouls(id) {
    return this.getStats(id).data.FOULS;
  }
  getTeamId() {
    return this.teamId;
  }
  getTeamName() {
    return this.team;
  }
}
