// consultaUsuarios.js

import { createConnection } from 'mysql2/promise';

async function consultaUsuarios() {
    let conexion;

    try {
        // Configura tu conexión aquí
        conexion = await createConnection({
            host: 'localhost', // o 127.0.0.1
            user: 'root',
            password: 'Enanito1998',
            database: 'new_schema'
        });

        // Realiza una consulta SQL
        const [usuarios] = await conexion.execute('SELECT * FROM user');

        // Imprime los resultados
        console.log('Usuarios:', usuarios);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
    } finally {
        // Cierra la conexión
        if (conexion) {
            await conexion.end();
        }
    }
}

consultaUsuarios();
