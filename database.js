const mysql = require('mysql2');
const { create } = require('node:domain');
const connectionString = 'mysql::peppiuser:peppipass@127.0.0.1/TestBank_db';

const connection = mysql.createPool(connectionString);
module.exports = connection;