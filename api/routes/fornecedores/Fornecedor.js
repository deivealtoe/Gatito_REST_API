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
}

module.exports = Fornecedor