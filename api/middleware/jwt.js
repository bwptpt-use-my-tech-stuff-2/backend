const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');

module.exports = {
  generateToken,
};

function generateToken(user) {
  // console.log(`TCL: generateToken -> user`, user);
  const payload = {
    id: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
};
