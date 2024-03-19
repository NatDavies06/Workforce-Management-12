const mysql = require('mysql2');

// Create connection pool
const pool = mysql.creatPool({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password',
    database: 'employee_tracker_db',
    waitForConnection: true,
    queueLimit: 0
});

module.exports = pool.promise();