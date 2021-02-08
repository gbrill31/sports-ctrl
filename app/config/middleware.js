module.exports = function (app, passport) {
  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    // console.log(req.isAuthenticated());
    next();
  });
  app.use(function (req, res, next) {
    res.redirectTo = function (route) {
      res.header('redirectTo', route);
    };

    res.alertError = (message) => {
      res.header(
        'notification',
        JSON.stringify({
          type: 'error',
          message,
          options: {
            autoClose: 5000,
          },
        })
      );
    };
    res.alertSuccess = (message) => {
      res.header(
        'notification',
        JSON.stringify({
          type: 'success',
          message,
          options: {
            autoClose: 5000,
          },
        })
      );
    };

    next();
  });
};
