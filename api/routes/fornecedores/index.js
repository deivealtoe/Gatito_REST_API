const router = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

router.get('/', async (request, response) => {
  const resultados = await TabelaFornecedor.listar()
  response.send(JSON.stringify(resultados))
})

router.post('/', async (request, response) => {
  const dadosRecebidos = request.body
  const fornecedor = new Fornecedor(dadosRecebidos)
  await fornecedor.criar()
  response.send(JSON.stringify(fornecedor))
})

router.get('/:idFornecedor', async (request, response) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const fornecedor = new Fornecedor({ id: idFornecedor })
    await fornecedor.carregar()
    response.send(JSON.stringify(fornecedor))
  } catch (err) {
    response.send(JSON.stringify({
      mensagem: err.message
    }))
  }
})

router.put('/:idFornecedor', async (request, response) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const dadosRecebidos = request.body
    const dados = Object.assign({}, dadosRecebidos, { id: idFornecedor })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    response.end()
  } catch(err) {
    response.send(JSON.stringify({
      mensagem: err.message
    }))
  }
})

router.delete('/:idFornecedor', async (request, response) => {
  try {
    const idFornecedor = request.params.idFornecedor
    const fornecedor = new Fornecedor({ id: idFornecedor })
    await fornecedor.carregar()
    await fornecedor.remover()
    response.end()
  } catch (err) {
    response.send(JSON.stringify({
      mensagem: err.message
    }))
  }
})

module.exports = router