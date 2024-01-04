const { Server } = require('socket.io');
const consola = require('consola');

const io = new Server();
// 客户端接入
io.on('connection', (socket) => {
  // 接收sdp消息
  socket.on('sdp', (msg) => {
    // 接收到sdp后将sdp广播出去
    socket.broadcast.emit('sdp', msg);
  });
  // 接收ice消息
  socket.on('ice', (msg) => {
    // 接收到ice后将ice广播出去
    socket.broadcast.emit('ice', msg);
  });
});

io.listen(9999);

consola.ready({
  message: 'Server listening on http://localhost:9999',
  badge: true,
});
