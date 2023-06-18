const mongoose = require('mongoose')

const ProdutoSchema = mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  cor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
module.exports = mongoose.model('Produto', ProdutoSchema)
