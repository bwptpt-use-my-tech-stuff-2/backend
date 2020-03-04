const router = require('express').Router();
const emailValidator = require('email-validator');
const bcrypt = require('bcryptjs');
const jwt = require('../../middleware/jwt.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('../../models/users/users-model.js');

const minPasswordLength = 8;
const passwordStrength = 12;

router.post('/register', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: register -> user\n`, userData);

  if (!userData.Email || !userData.Password) {
    res.status(400).json({ message: `Required data missing` });
  } else if (Users.readUserByEmail(userData.Email)) {
    res.status(400).json({ message: `Email address provided is already registered! Please login as that user to proceed or register with a different address.` });
  } else if (!emailValidator.validate(userData.Email)) {
    res.status(400).json({ message: `Email address provided appears to be invalid! Please check and try again.` });
  } else if (userData.Password.length < minPasswordLength) {
    res.status(400).json({ message: `Password provided is too short! Please provide a password as least ${minPasswordLength} characters long.` });
  } else {
    const hash = bcrypt.hashSync(userData.Password, passwordStrength);
    if (!process.env.NO_LOGGER) console.log(`TCL: register -> hash =`, hash);
    
    userData.Password = hash;

    Users.createUser(userData)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        if (!process.env.NO_LOGGER) console.log(`TCL: register -> err\n`, err);
        res.status(500).json(err);
      });
  };
});

router.post('/login', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: login -> user input\n`, userData);

  if (!userData.Email || !userData.Password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    email = userData.Email;
    Users.readUserByEmail(email)
      .then(user => {
        if (!process.env.NO_LOGGER) console.log(`TCL: login -> user found\n`, user);
        if (user) {
          const b = bcrypt.compareSync(userData.Password, user.Password);
          if (!process.env.NO_LOGGER) console.log(`TCL: login -> b =`, b);
          if (b) {
            const token = jwt.generateToken(user);
            if (!process.env.NO_LOGGER) console.log(`TCL: login -> token\n`, token);
            res.status(200).json({
              id: user.id,
              message: `Welcome ${user.FirstName}!`,
              token,
            });
          } else {
            res.status(401).json({ message: `Invalid Credentials` });
          };
        } else {
          res.status(404).json({ message: `Invalid User` });
        };
      })
      .catch(err => {
        res.status(500).json(`TCL: login -> err\n`, err);
      });
  };
});

module.exports = router;
