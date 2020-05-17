import Player from './Player';

export default class Team {
  constructor(data) {
    Object.assign(this, data);
    if (this.players) {
      this.players = this.players.map(player => new Player(player));
    }
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name.toLowerCase();
  }
  getLeague() {
    return this.league.toLowerCase();
  }
  getCountry() {
    return this.country.toLowerCase();
  }
  getCity() {
    return this.city.toLowerCase();
  }
  getPlayers() {
    return this.players || [];
  }
}