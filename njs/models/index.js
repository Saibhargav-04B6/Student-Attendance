// dbConfig.js
const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '7658@Sai',
  database: 'Bharath',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database!');
});

module.exports = connection;
