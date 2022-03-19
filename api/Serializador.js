const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
  getJson(dados) {
    return JSON.stringify(dados)
  }

  serializar(dados) {
    if (this.contentType === 'application/json') {
      return this.getJson(this.filtrar(dados))
    }

    throw new ValorNaoSuportado(this.contentType)
  }

  filtrarObjeto(dados) {
    const novoObjeto = {}
    
    this.camposPublicos.forEach((campo) => {
      if (dados.hasOwnProperty(campo)) {
        novoObjeto[campo] = dados[campo]
      }
    })

    return novoObjeto
  }

  filtrar(dados) {
    if (Array.isArray(dados)) {
      dados = dados.map((item) => {
        return this.filtrarObjeto(item)
      })
    } else {
      dados = this.filtrarObjeto(dados)
    }

    return dados
  }
}

class SerializadorFornecedor extends Serializador {
  constructor(contentType) {
    super()
    this.contentType = contentType
    this.camposPublicos = ['id', 'nome', 'categoria']
  }
}

module.exports = {
  Serializador: Serializador,
  SerializadorFornecedor: SerializadorFornecedor,
  formatosAceitos: ['application/json']
}