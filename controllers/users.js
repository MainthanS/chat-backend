const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

userRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const existingUser = await User.findOne({ username })
  const passwordHash = await bcrypt.hash(password, 10)

  if (existingUser) {
    return response.status(409).end()
  }

  const user = new User({
    username,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

userRouter.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = userRouter
