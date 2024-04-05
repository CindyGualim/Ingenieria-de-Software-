// consultaUsuarios.js
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';

// Función para crear la conexión a la base de datos
async function crearConexion() {
    return createConnection({
        host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
        user: 'doadmin',
        password: 'AVNS_vZ5PYsLGFBH6p3zDbhw',
        database: 'defaultdb',
        port: 25060,
        ssl: {
            ca: readFileSync('C:\\Users\\cindy_7sr6dyy\\Downloads\\ca-certificate.crt')
        }
    });
}

// Función para buscar un usuario por email
async function buscarUsuarioPorEmail(email) {
    const conexion = await crearConexion();
    try {
        const [usuarios] = await conexion.execute(`SELECT * FROM user WHERE email = '${email}'`);
        console.log(usuarios);
    } catch (error) {
        console.error('Error al buscar usuario:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}

// Función para crear un nuevo usuario
async function crearUsuario(id, username, email) {
    const conexion = await crearConexion();
    try {
        const [result] = await conexion.execute(`INSERT INTO user (id, username, email) VALUES (${id}, '${username}', '${email}')`);
        console.log(result);
    } catch (error) {
        console.error('Error al crear usuario:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}

// Función para eliminar un usuario por ID
async function eliminarUsuarioPorID(id) {
    const conexion = await crearConexion();
    try {
        const [result] = await conexion.execute(`Delete from user where ID = ${id}`);
        console.log(result);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}

// Función para borrar chats con un usuario
async function borrarChatsConUsuario(idChat) {
    const conexion = await crearConexion();
    try {
        const [usuarios] = await conexion.execute(`DELETE FROM chat_integrants WHERE id_chat = ${idChat}`);
        console.log(usuarios);
    } catch (error) {
        console.error('Error al borrar chats:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}

// Función para ver sesiones en curso
async function verSesionesEnCurso() {
    const conexion = await crearConexion();
    try {
        const [sesion] = await conexion.execute(`SELECT * FROM sessionPlanned WHERE dated = CURDATE() AND start_hour <= CURTIME() AND end_hour >= CURTIME()`);
        console.log(sesion);
    } catch (error) {
        console.error('Error al ver sesiones en curso:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}

// Función para borrar una sesión
async function borrarSesion(date) {
    const conexion = await crearConexion();
    try {
        const [sesion] = await conexion.execute(`DELETE FROM sessionPlanned WHERE dated = '${date}'`);
        console.log(sesion);
    } catch (error) {
        console.error('Error al borrar sesión:', error);
    } finally {
        if (conexion) {
            await conexion.end();
        }
    }
}