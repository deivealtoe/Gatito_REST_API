const config = require('config')
const express = require('express')
const rotaFornecedores = require('./routes/fornecedores/index')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

const server = express()
server.use(express.json())

server.use((request, response, next) => {
  let formatoRequisitado = request.header('Accept')

  if (formatoRequisitado === '*/*') {
    formatoRequisitado = 'application/json'
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    response.status(406)
    
    return response.end()
  }

  response.setHeader('Content-Type', formatoRequisitado)
  next()
})

server.use('/api/fornecedores', rotaFornecedores)

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

  const serializadorErro = new SerializadorErro(response.getHeader('Content-Type'))
  response.status(status)
  response.send(serializadorErro.serializar({
    mensagem: err.message,
    id: err.idErro
  }))
})

const host = config.get('api.host')
const port = config.get('api.port')
server.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))