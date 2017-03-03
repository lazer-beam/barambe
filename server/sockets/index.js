module.exports = socket => {
  // console.log(`Socket ${socket.id} has connected`)

  socket.on('disconnect', () => {
    // console.log(`user ${socket.id} has disconnected`)
  })
}
