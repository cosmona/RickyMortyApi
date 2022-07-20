// script que se ocupará de crear las tablas y añadir datos
// node initDB.js
require('dotenv').config();

const getDB = require('./db');

let connection;

async function main() {
  try {
    //DEBUG
    console.log(process.env.MYSQL_USER);

    connection = await getDB();

    // crear la tabla usuarios
    await connection.query(`
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL
        )
    `);
  } catch (error) {
    console.error('ERROR:', error.message);
  } finally {
    // libero la connección
    if (connection) {
      connection.release();
    }
    process.exit();
  }
}

main();
