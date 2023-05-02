const express = require('express');
const loginRouter = require('./login.route');
const registerRouter = require('./register.route');

const routes = express.Router();

routes.use('/login', loginRouter);

routes.use('/register', registerRouter);

module.exports = routes;
