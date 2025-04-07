const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: '*' }
});

app.use(cors());

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', { id: socket.id, msg });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server listening on port 3001');
});
