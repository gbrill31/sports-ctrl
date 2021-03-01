const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');
const fs = require('fs');
const genKeyPair = require('./generateKeyPair').genKeyPair;

if (!fs.existsSync(path.join(__dirname, 'rsa_priv.pem'), 'utf8')) {
  genKeyPair();
}
const DB = require('./app/config/database');

require('./app/config/passport')(passport);

dotenv.config();

const app = express();

// Serve the static files to the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use(logger('dev'));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

DB.connect().then(
  (message) => {
    console.log('DB Connected');
  },
  () => {
    console.error('Unable to connect to DB');
  }
);

app.use(passport.initialize());
app.use(passport.session());

require('./app/config/middleware')(app, passport);

//================ ROUTES ========================//
app.use('/', require('./app/routes/authRoutes'));
app.use('/connect', require('./app/routes/dbRoutes'));
app.use('/api', require('./app/routes/apiRoutes')(passport));
app.use('/api/users', require('./app/routes/usersRoutes'));
app.use('/api/games', require('./app/routes/gamesRoutes'));
app.use('/api/venues', require('./app/routes/venuesRoutes'));
app.use('/api/leagues', require('./app/routes/leaguesRoutes'));
app.use('/api/teams', require('./app/routes/teamsRoutes'));
app.use('/api/players', require('./app/routes/playersRoutes'));

app.use('/', require('./app/routes/routes'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.message, err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
