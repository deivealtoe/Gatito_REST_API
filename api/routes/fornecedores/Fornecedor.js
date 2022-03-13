const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
  constructor({ id, nome, email, categoria, createdAt, updatedAt }) {
    this.id = id
    this.nome = nome
    this.email = email
    this.categoria = categoria
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  async criar() {
    const resultado = await TabelaFornecedor.inserir({
      nome: this.nome,
      email: this.email,
      categoria: this.categoria
    })

    this.id = resultado.id
    this.createdAt = resultado.createdAt
    this.updatedAt = resultado.updatedAt
  }

  async carregar() {
    const encontrado = await TabelaFornecedor.pegarPorId(this.id)
    this.nome = encontrado.nome
    this.email = encontrado.email
    this.categoria = encontrado.categoria
    this.createdAt = encontrado.createdAt
    this.updatedAt = encontrado.updatedAt
  }
}

module.exports = Fornecedor