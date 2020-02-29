const jwt = require('jsonwebtoken');
const secrets = require('./config/secrets.js');

function auth(req, res, next) {
  if (!process.env.NO_LOGGER) console.log(`TCL: auth -> req.headers\n`, req.headers);

  const token = req.headers.authorization;
  if (!process.env.NO_LOGGER) console.log(`TCL: auth -> token`, token);
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Access not authorized!" });
      } else {
        req.decodedJwt = decodedToken;
        if (!process.env.NO_LOGGER) console.log(`TCL: auth -> success!`);
        next();
      };
    });
  } else {
    res.status(400).json({ message: `Missing token.` });
  };
};

module.exports = auth;