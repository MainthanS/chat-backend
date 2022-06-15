const messageRouter = require('express').Router()
const Message = require('../models/message')
const User = require('../models/user')
const getToken = require('../utils/token')
const jwt = require('jsonwebtoken')

messageRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const message = new Message({
    content: body.content,
    date: new Date(),
    from: user._id,
    to: body.to
  })

  const savedMessage = await message.save()

  response.json(savedMessage)
})

messageRouter.get('/', async (request, response) => {
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const messages = await Message.find().or([{ to: user._id }, { from: user._id }])

  response.json(messages)

})

module.exports = messageRouter
