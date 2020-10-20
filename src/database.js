const mysql = require('mysql');
// Para soportar promesas
const { promisify } = require('util');
const { database } = require('./keys');

// Generar conexión a la base de datos
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LIST') {
      console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TO MANY CONNECTIONS');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('DATABASE CONNECTION WAS REFUSED');
    }
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('ACCESS DENIED');
    }
  }

  if (connection) {
    connection.release();
    console.log('DB IS CONNECTED');
  }
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;