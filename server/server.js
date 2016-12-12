const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
// generateMessage();
app.use(express.static(publicPath));

io.on('connection',function (socket)  {
  console.log('new user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined room '));

  socket.on('createMessage', (message, callback) => {
    console.log('create message', message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is a reply');
  });
    socket.on('disconnect', () => {
      console.log('User was disconnected');
    });
  });
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
