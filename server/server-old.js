const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function (socket)  {
  console.log('new user connected');

  socket.emit('newEmail',{
    from: 'avi@example.com',
    text: 'Hey. what is going on.',
    createdAt: 1213
  });
  socket.on('createEmail', (newEmail) => {
    console.log('create email', newEmail);
  })
  socket.on('disconnect', function () {
  console.log('disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
