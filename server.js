const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

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

// const pg = require('pg');
// const pgSession = require('connect-pg-simple')(session);

// const pgPool = new pg.Pool({
//   database: 'sportscontrol',
// });
// app.use(
//   session({
//     saveUninitialized: true,
//     store: new pgSession({
//       pool: pgPool,
//     }),
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
//   })
// );

app.use(logger('dev'));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
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
app.use('/api/teams', require('./app/routes/teamsRoutes'));
app.use('/api/players', require('./app/routes/playersRoutes'));
//The vue router should be last
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
