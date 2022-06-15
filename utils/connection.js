const logger = require('./logger')
const jwt = require('jsonwebtoken')

let userToSocket = {}

class Connection {
  constructor(io, socket) {
    this.io = io
    this.socket = socket

    logger.info(`client connected: ${socket.id}`)

    socket.on('disconnect', () => {
      logger.info(`client disconnected: ${socket.id}`)
    })
    socket.on('chat message', (message, token) => {
      this.sendMessage(message,token)
    })
    socket.on('identify user', (token) => this.identifyUser(token))
  }

  identifyUser = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (decodedToken.id) {
      userToSocket[decodedToken.id] = this.socket
    }
  }

  sendMessage = (message, token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (userToSocket[message.to] !== undefined && message.from === decodedToken.id) {
      message.from = decodedToken.id
      userToSocket[message.to].emit('chat message', message)
    }
  }
}

const connection = io => {
  io.on('connection', (socket) => {
    new Connection(io, socket)
  })
}

module.exports = connection
