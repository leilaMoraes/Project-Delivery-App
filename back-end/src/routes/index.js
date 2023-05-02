const express = require('express');
const loginRouter = require('./login.route');

const routes = express.Router();

routes.use('/login', loginRouter);

module.exports = routes;
