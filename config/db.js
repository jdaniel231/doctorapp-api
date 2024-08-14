const pg = require('pg');
const dotenv = require('dotenv');

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect(function(err) {
  if (err) {
    console.log('error connecting to db', err);
  } else {
    console.log('connected to db');
  }
});

module.exports = pool;
