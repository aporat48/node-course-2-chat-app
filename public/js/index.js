var socket = io();
socket.on('connect', () => {
  console.log('connected to server');

});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});
socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}:`);
  //console.log('aaaa', li);
  $('#messages').append(li);
});
// socket.emit('createMessage', {
//   from: "Frank",
//   text: "Hi"
// }, function (data) {
//   console.log('Got it', data);
// });
$('#message-form').on('submit', function (e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});
