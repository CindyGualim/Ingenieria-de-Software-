import { createPool } from 'mysql2/promise';
import { readFileSync } from 'fs';

// Crear el pool de conexiones
const pool = createPool({
    host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'AVNS_vZ5PYsLGFBH6p3zDbhw',
    database: 'defaultdb',
    port: 25060,
    ssl: {
        ca: readFileSync('ca-certificate.crt')
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool