const router = require('express').Router();
const path = require('path');

router.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../..', '/client/build/index.html'));
  next();
});

module.exports = router;
