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
    return this.stats;
  }
  getTeamId() {
    return this.teamId;
  }
  getTeamName() {
    return this.team;
  }
}