const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

router.get('/', async (request, response) => {
  const resultados = await TabelaFornecedor.listar()
  response.status(200)
  const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'))
  response.send(serializador.serializar(resultados))
})

router.post('/', async (request, response, next) => {
  try {
    const dadosRecebidos = request.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    response.status(201)
    const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'))
    response.send(serializador.serializar(fornecedor))
  } catch(err) {
    next(err)
  }
})

router.get('/:idFornecedor', async (request, response, next) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const fornecedor = new Fornecedor({ id: idFornecedor })
    await fornecedor.carregar()
    response.status(200)
    const serializador = new SerializadorFornecedor(response.getHeader('Content-Type'))
    response.send(serializador.serializar(fornecedor))
  } catch (err) {
    next(err)
  }
})

router.put('/:idFornecedor', async (request, response, next) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const dadosRecebidos = request.body
    const dados = Object.assign({}, dadosRecebidos, { id: idFornecedor })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    response.status(204)
    response.end()
  } catch(err) {
    next(err)
  }
})

router.delete('/:idFornecedor', async (request, response, next) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const fornecedor = new Fornecedor({ id: idFornecedor })
    await fornecedor.carregar()
    await fornecedor.remover()
    response.status(204)
    response.end()
  } catch (err) {
    next(err)
  }
})

module.exports = router