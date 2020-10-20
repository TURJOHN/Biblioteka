const {
  createPool
} = require("mysql");

const pool = createPool({
  host: 'localhost',
  port: '3306', 
  user: 'root', 
  password: '', 
  database: 'mydb', 
  connectionLimit: 0,
  queueLimit : 0
});

console.log('In');

module.exports = pool;