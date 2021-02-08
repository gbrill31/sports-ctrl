const siteURL = {
  development: 'http://localhost:3000',
  production: '',
};

module.exports = {
  siteURL() {
    return siteURL[process.env.NODE_ENV || 'development'];
  },
};
