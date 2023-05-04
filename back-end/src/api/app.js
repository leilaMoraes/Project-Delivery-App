const express = require('express');
const cors = require('cors');
require('express-async-errors');
const path = require('node:path');
const http = require('node:http');
const { Server } = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const routes = require('../routes');
const error = require('../middlewares/error');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/products/register', express
  .static(path.resolve(__dirname, '..', '..', 'public', 'images')));

app.use(routes);

app.use(express.static('public'));

app.use(error);

module.exports = {
  app,
  io,
};
