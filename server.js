const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');
const compression = require('compression');
const cookieParser = require('cookie-parser');
// const sqlDB = require('./app/config/database');
const logger = require('morgan');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(compression());
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'src/assets', 'logo.png')));
// app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session({
//     secret: "sportsControl.io", //TODO change
//     resave: true,
//     saveUninitialized: false
// }));

app.use(logger('dev'));

//================ ROUTES ========================//

app.use("/connect", require('./app/routes/dbRoutes'));
app.use("/game", require('./app/routes/gameDbRoutes'));
//The vue router should be last
app.use("/", require("./app/routes/routes"));


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
