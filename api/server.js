const express = require('express');

const apiRouter = require('./routes/api-router.js');
const middleware = require('./middleware/index.js');

const server = express();
middleware(server);

server.use('/api', apiRouter);

module.exports = server;
