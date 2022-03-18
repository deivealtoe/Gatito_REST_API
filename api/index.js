const config = require('config')
const express = require('express')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

const server = express()
server.use(express.json())

const router = require('./routes/fornecedores/index')
server.use('/api/fornecedores', router)

server.use((err, request, response, next) => {
  let status = 500

  if (err instanceof NaoEncontrado ) {
    status = 404
  }
  
  if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
    status = 400
  }

  if (err instanceof ValorNaoSuportado) {
    status = 406
  }

  response.status(status)
  response.send(JSON.stringify({
    mensagem: err.message,
    id: err.idErro
  }))
})

const host = config.get('api.host')
const port = config.get('api.port')
server.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))