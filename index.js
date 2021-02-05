const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('./db');

app.set('port', 4500);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api', require('./routes/usuarios'));

const server = app.listen(app.get('port'), () => {
  console.log('Working in the port..', app.get('port'));
});

// Websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
  console.log('Someone has connected to the server', socket.id);
  socket.on('chat:message', (data) => {
    console.log(data);
    io.sockets.emit('chat:message', data);
  });
});
