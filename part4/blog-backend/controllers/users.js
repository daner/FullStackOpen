const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(!password) {
    response.status(400).send({error: 'Password must be given' })
    return
  }

  if(password.length < 3) {
    response.status(400).send({error: 'Password is to short' })
    return
  }

  var existingUser = await User.find({username: username})

  if(existingUser.length > 0) {
    response.status(400).send({error: 'Username is already used' })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, resposne) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    resposne.json(users)
})

module.exports = usersRouter