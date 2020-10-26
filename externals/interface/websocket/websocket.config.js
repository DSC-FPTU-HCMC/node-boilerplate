const { authService } = rootRequire('/core/services/');
const {
  TOKEN_INVALID
} = rootRequire('/core/constants/');

module.exports.registerWebsocket = server => {
  const io = require('socket.io')(server);

  // io.use((socket, next) => {
  //   next();
  // });

  io.on('connection', async socket => {
    const authorizationHeader = socket.handshake.headers['Authorization'].split('Bearer ')[1];
    const accessToken = authorizationHeader && authorizationHeader.split('Bearer ')[1];
    if (!accessToken)
      return socket.disconnect(true);

    const result = await authService.verifyToken({ accessToken });
    if (result.message === TOKEN_INVALID)
      return socket.disconnect(true);

    const user = result.data.user;
    socket.on(`${user.id}`, msg => {
      io.emit(`${user.id}`, msg);
    });
  });
}