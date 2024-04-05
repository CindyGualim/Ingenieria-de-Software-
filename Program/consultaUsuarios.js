import express from 'express';

import { createPool } from 'mysql2/promise';
import { readFileSync } from 'fs'; // Necesario para leer archivos, como el certificado SSL

const app = express();
const port = 3000;

// Crear pool de conexiones a la base de datos
const pool = createPool({
    host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'AVNS_vZ5PYsLGFBH6p3zDbhw',
    database: 'defaultdb',
    port: 25060,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        // DigitalOcean requiere SSL para conexiones a la base de datos
        // Reemplaza 'path/to/your/certificate.crt' con la ubicación de tu certificado CA de DigitalOcean
        ca: readFileSync('ca-certificate.crt')
    }
});

// Endpoint para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Endpoint para obtener un usuario por su ID
app.get('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
});

// Otros endpoints para crear, actualizar y eliminar usuarios...

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
