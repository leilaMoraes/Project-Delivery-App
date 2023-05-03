const express = require('express');
const cors = require('cors');
const path = require('node:path');
const http = require('node:http');
const { Server } = require('socket.io');
const routes = require('../routes');
const error = require('../middlewares/error');
require('express-async-errors');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/products/register', express
  .static(path.resolve(__dirname, '..', '..', 'public', 'images')));

app.use(routes);

app.use(express.static('public'));

app.use(error);

module.exports = {
  app,
  io,
};
