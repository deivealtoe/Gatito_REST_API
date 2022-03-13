const ModeloTabelaFornecedor = require('../../api/routes/fornecedores/ModeloTabelaFornecedor')

ModeloTabelaFornecedor.sync().then(() => {
  console.log('Tabela criada com sucesso!')
}).catch((err) => {
  console.log(err)
})