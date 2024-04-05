import { createPool } from 'mysql2/promise';
import { readFileSync } from 'fs';

// Función para crear el pool de conexiones a la base de datos
async function crearPoolConexion() {
    return createPool({
        host: 'db-mysql-nyc3-74035-do-user-16199995-0.c.db.ondigitalocean.com',
        user: 'doadmin',
        password: 'AVNS_vZ5PYsLGFBH6p3zDbhw',
        database: 'defaultdb',
        port: 25060,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: {
            ca: readFileSync('C:\\Users\\cindy_7sr6dyy\\Downloads\\ca-certificate.crt')
        }
    });
}

// Todos los usuarios que son estudiantes
async function obtenerEstudiantes() {
    const pool = await crearPoolConexion();
    try {
        const conexion = await pool.getConnection();
        const [estudiantes] = await conexion.execute(`
            SELECT u.id, u.username, u.email 
            FROM user u 
            JOIN student s ON u.id = s.id
        `);
        console.log(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
    } finally {
        if (pool) {
            pool.end();
        }
    }
}

// Todos los mensajes de un chat específico
async function obtenerMensajesDeChat(idChat) {
    const pool = await crearPoolConexion();
    try {
        const conexion = await pool.getConnection();
        const [mensajes] = await conexion.execute(`
            SELECT m.content, m.time_sent 
            FROM messages m 
            JOIN chat_messages cm ON m.id_message = cm.id_message 
            WHERE cm.id_chat = ?
        `, [idChat]);
        console.log(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes de chat:', error);
    } finally {
        if (pool) {
            pool.end();
        }
    }
}

// Sesiones planificadas y su información de curso correspondiente
async function obtenerSesionesPlanificadas() {
    const pool = await crearPoolConexion();
    try {
        const conexion = await pool.getConnection();
        const [sesiones] = await conexion.execute(`
            SELECT sp.id, c.namecourse, sp.dated, sp.start_hour, sp.end_hour, sp.mode 
            FROM sessionPlanned sp 
            JOIN course c ON sp.course_code = c.course_code
        `);
        console.log(sesiones);
    } catch (error) {
        console.error('Error al obtener sesiones planificadas:', error);
    } finally {
        if (pool) {
            pool.end();
        }
    }
}

// Reportes de ausencia junto con la información del remitente y del ausente
async function obtenerReportesDeAusencia() {
    const pool = await crearPoolConexion();
    try {
        const conexion = await pool.getConnection();
        const [reportes] = await conexion.execute(`
            SELECT ar.comment, ar.id_session, u1.username AS 'Sender', u2.username AS 'Absent Party' 
            FROM ausentReport ar 
            JOIN user u1 ON ar.id_sender = u1.id 
            JOIN user u2 ON ar.id_ausentparty = u2.id
        `);
        console.log(reportes);
    } catch (error) {
        console.error('Error al obtener reportes de ausencia:', error);
    } finally {
        if (pool) {
            pool.end();
        }
    }
}

// Estudiantes y su disponibilidad
async function obtenerDisponibilidadEstudiantes() {
    const pool = await crearPoolConexion();
    try {
        const conexion = await pool.getConnection();
        const [disponibilidad] = await conexion.execute(`
            SELECT u.username, hd.hournumber, hd.day_week 
            FROM hoursdisponibility hd 
            JOIN user u ON hd.studentID = u.id
        `);
        console.log(disponibilidad);
    } catch (error) {
        console.error('Error al obtener disponibilidad de estudiantes:', error);
    } finally {
        if (pool) {
            pool.end();
        }
    }
}

export {
    obtenerEstudiantes,
    obtenerMensajesDeChat,
    obtenerSesionesPlanificadas,
    obtenerReportesDeAusencia,
    obtenerDisponibilidadEstudiantes
};
