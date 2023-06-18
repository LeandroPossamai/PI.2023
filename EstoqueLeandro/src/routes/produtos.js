const express = require('express')
const router = express.Router()
const Produto = require('../models/produto')

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find()
    return res.send(produtos)
  } catch (error) {
    return res.status(400).send({ error: 'Não foi possivel encontrar produtos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)
    if (!produto) return res.status(400).send({ error: 'Não foi possivel encontrar produto' })
    return res.send(produto)
  } catch (error) {
    return res.status(400).send({ error: 'Não foi possivel encontrar produto' })
  }
})

router.post('/', async (req, res) => {
  try {
    const produto = await Produto.create(req.body)
    return res.send(produto)
  } catch (error) {
    return res.status(400).send({ error: 'Não foi possivel criar produto' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Produto.findByIdAndRemove(req.params.id)
    return res.send({ sucesso: 'Deletado com sucesso' })
  } catch (error) {
    return res.status(400).send({ error: 'Não foi possivel deletar o produto' })
  }
})

module.exports = router
