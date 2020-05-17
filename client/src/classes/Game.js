import Team from './Team';

export default class Game {
  constructor(data) {
    Object.assign(this, data, {
      home: new Team(data.home),
      away: new Team(data.away)
    });
  }

  getId() {
    return this.id;
  }
  getName() {
    return `${this.home} vs ${this.away}`;
  }
  getHomeTeam() {
    return this.home;
  }
  getAwayTeam() {
    return this.away;
  }
}