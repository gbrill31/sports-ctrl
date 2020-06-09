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
  getPlayers(sortField, filterValue) {
    let players = this.players;
    if (sortField) {
      players = players
        .sort((playerA, playerB) => playerA[sortField] > playerB[sortField] ? 1 : -1);
    }
    if (filterValue !== '') {
      players = players
        .filter(player => player.getName().includes(filterValue) || player.getNumber().includes(filterValue));
    }
    return players || [];
  }
  updatePlayerStats(id, data) {
    const player = this.players.find(p => p.getId() === id);
    if (player) player.updateStats(data);
    return this;
  }
}