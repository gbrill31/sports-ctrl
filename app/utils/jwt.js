const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, '../..', 'rsa_priv.pem'),
  'utf8'
);

module.exports = {
  issueJwt: (userId) => {
    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 6;

    const payload = {
      sub: userId,
      iat: Date.now(),
      exp: expiresIn,
    };

    const signedToken = jwt.sign(payload, PRIV_KEY, {
      algorithm: 'RS256',
    });

    return {
      token: `Bearer ${signedToken}`,
      expires: expiresIn,
    };
  },
};
