const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const connection = require('./utils/connection')
const socketio = require('socket.io')

const server  = http.createServer(app)
const io = new socketio.Server(server)
connection(io)

server.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`)
})
