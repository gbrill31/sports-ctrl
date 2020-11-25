const crypto = require('crypto');
const shortid = require('shortid');

module.exports = {
  generatePassword: (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return {
      salt,
      hash,
    };
  },
  generateTempPassword: () => shortid.generate(),
  validatePassword: (password, hash, salt) => {
    const hashToVerify = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return hashToVerify === hash;
  },
};
