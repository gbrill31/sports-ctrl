export default class Team {
  constructor(data) {
    Object.assign(this, data);
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
}