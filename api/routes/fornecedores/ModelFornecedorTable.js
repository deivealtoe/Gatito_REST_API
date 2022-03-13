const Sequelize = require('sequelize')
const sequelizeInstance = require('../../banco_de_dados/index')

const columns = {
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM('Ração', 'Brinquedo'),
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'fornecedores',
  timestamps: true
}

module.exports = sequelizeInstance.define('fornecedor', columns, opcoes)