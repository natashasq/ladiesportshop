const mysql = require('mysql2/promise');
const dbConfig = require("./db.config");

const db = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = db;