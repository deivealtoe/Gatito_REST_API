const Sequelize = require('sequelize')
const config = require('config')

const sequelizeInstance = new Sequelize(
  config.get('mysql.database-name'),
  config.get('mysql.user'),
  config.get('mysql.password'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql'
  }
)

module.exports = sequelizeInstance