import * as express from 'express';
import * as http from 'http';
import * as sio from 'socket.io';
import { environment } from '../src/environments/environment';

const app = express();
const server = new http.Server(app);
const io = sio(server);

io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });
});

server.listen(environment.appPort, () => {
    console.log(`chat port on[${environment.appPort}]`);
});


