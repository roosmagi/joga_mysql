// create database connection
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty',
    database: 'joga_mysql'
})

module.exports = db;