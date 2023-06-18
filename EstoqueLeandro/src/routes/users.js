const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/token')

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    return res.send(users)
  } catch (err) {
    return res.status(400).send({ error: 'Não tem usuario' })
  }
})

// Get user by id
router.get('/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id)

    if (!user)
      return res
        .status(404)
        .send({ error: `Não foi possivel encontrar o usuario ${req.params.user_id}` })

    return res.send(user)
  } catch (err) {
    return res
      .status(400)
      .send({ error: `Não foi possivel encontrar o usuario ${req.params.user_id}` })
  }
})

// Create a user
router.post('/', async (req, res) => {
  const { email } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).send({ error: 'Usario existente!' })

    const user = await User.create(req.body)

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch (err) {
    return res.status(400).send({ error: 'Falha na criação' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(404).send({ error: 'Email ou senha incorreta' })

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) return res.status(404).send({ error: 'Email ou senha incorreta' })

  return res.send({
    user,
    token: generateToken({ id: user.id }),
  })
})

// Delete a user
router.delete('/:user_id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.user_id)

    return res.send({
      sucesso: `User ${req.params.user_id} Deletado com successo`,
    })
  } catch (err) {
    return res.status(400).send({ error: `Não foi possivel deletar usuario ${req.params.user_id}` })
  }
})

module.exports = router
