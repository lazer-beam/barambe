const bartenderio = require('./bartenderio')

module.exports = socket => {
  console.log(`Socket ${socket.id} has connected`)
  bartenderio(socket)

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} has disconnected`)
  })
}
