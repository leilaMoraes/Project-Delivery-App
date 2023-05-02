const express = require('express');
const routes = require('../routes');
const error = require('../middlewares/error');
require('express-async-errors');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes);

app.use(error);

module.exports = app;
