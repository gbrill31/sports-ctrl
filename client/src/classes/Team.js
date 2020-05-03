export default class Team {
  constructor(data) {
    Object.assign(this, data);
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getLeague() {
    return this.league;
  }
  getCountry() {
    return this.country;
  }
  getCity() {
    return this.city;
  }
}