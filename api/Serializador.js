const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
  getJson(dados) {
    return JSON.stringify(dados)
  }

  serializar(dados) {
    if (this.contentType === 'application/json') {
      return this.getJson(dados)
    }

    throw new ValorNaoSuportado(this.contentType)
  }
}

module.exports = {
  Serializador: Serializador,
  formatosAceitos: ['application/json']
}