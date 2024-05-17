const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

// Configuración del pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
    host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
        user: 'doadmin',
        password: 'AVNS_vZ5PYsLGFBH6p3zDbhw',
        database: 'defaultdb',
        port: 25060,
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
        ssl: {
            ca: readFileSync('./src/backend/ca-certificate.crt')
        }
});

module.exports = pool;
