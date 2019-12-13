
// const request       = require('request');
// const SpotifyConfig   = require('./spotify.js').config;
// var jwt           = require('./jwt.js');

module.exports = function(app){

  app.use(function(req, res, next){

    res.redirectTo = function(state){
      res.header('redirectTo', state);
    };

    next();
  });


};
