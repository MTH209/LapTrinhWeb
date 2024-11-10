const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost', // 127.0.0.1
    user: 'root',
    password:'',
    database:'todo_app'
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err.stack);
        return;
    }
    console.log('Connected to the database.');
});
module.exports = db;