const mySQL = require("mysql2");

const connectionConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'blog'
  };


const conexion = mySQL.createConnection(connectionConfig) 


module.exports = {
    conexion
}