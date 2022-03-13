const config = require('config')
const express = require('express')

const server = express()
server.use(express.json())

const router = require('./routes/fornecedores/index')
server.use('/api/fornecedores', router)

const host = config.get('api.host')
const port = config.get('api.port')
server.listen(port, host, () => console.log(`Server started at http://${host}:${port}`))