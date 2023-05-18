import 'dotenv/config';
import app from './app';
import { Server } from 'socket.io';
import * as http from 'node:http';

const port = process.env.PORT || 3001;

const server = http.createServer(app);
export const io = new Server(server);

io.on('connection', () => {
  console.log('connected');
});

server.listen(port);
console.log(`Api rodando na porta ${port}`);
