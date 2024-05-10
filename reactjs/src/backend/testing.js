const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./Connection');  // Asumiendo que tu archivo se llama Connection.js y está en la carpeta backend
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'tu_secreto_aqui'; // Utiliza una variable de entorno para tu secreto
const bcrypt = require('bcrypt'); // Asegúrate de que bcrypt esté importado


const app = express();
app.use(cors());  // Permite solicitudes CORS de tu frontend
app.use(express.json());  // Para parsear JSON en el cuerpo de las solicitudes


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);  // No token present

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);  // Token invalid or expired
        req.user = user;
        next();
    });
};

// Endpoint de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);

    const domainRegex = /@uvg\.edu\.gt$/i;
    if (!domainRegex.test(email)) {
        return res.status(401).json({ success: false, message: "Invalid email domain. Only @uvg.edu.gt is allowed." });
    }

    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(
                'SELECT id, password FROM user WHERE email = ?',
                [email]
            );

            if (results.length > 0) {
                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    res.json({ success: true, message: "Login successful", user: { id: user.id } });
                } else {
                    res.status(401).json({ success: false, message: "Invalid credentials" });
                }
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



// Endpoint para hacer el registro de nuevos usuarios
app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log(`Attempting to register a new user with username: ${username}, email: ${email}, role: ${role}`);

    // Verificar si el correo pertenece al dominio uvg.edu.gt
    const domainRegex = /@uvg\.edu\.gt$/i;
    if (!domainRegex.test(email)) {
        return res.status(401).json({ success: false, message: "Invalid email domain. Only @uvg.edu.gt is allowed." });
    }

    // Asignar el valor numérico adecuado a typeuser (1 = student, 2 = tutor)
    const typeuser = role === 'student' ? 1 : 2;

    try {
        const connection = await pool.getConnection();
        try {
            // Verificar si el usuario ya existe
            const [existingUser] = await connection.query('SELECT id FROM user WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(409).json({ success: false, message: "User already exists" });
            }

            // Obtener el id más alto y calcular el siguiente
            const [maxResult] = await connection.query('SELECT MAX(id) AS maxId FROM user');
            const nextId = (maxResult[0].maxId || 0) + 1;

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar el nuevo usuario con el id calculado
            const [result] = await connection.query(
                'INSERT INTO user (id, username, email, password, typeuser) VALUES (?, ?, ?, ?, ?)',
                [nextId, username, email, hashedPassword, typeuser]
            );

            console.log('User registered successfully:', result.insertId);
            res.json({ success: true, message: "User registered successfully", userId: result.insertId });
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



// Endpoint para obtener sesiones por periodo del día
app.get('/sessions', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const periodo = req.query.periodo; // El periodo puede ser "manana", "tarde", o "noche"
        let query, params;

        console.log("El periodo elegido es: " + periodo);

        if (periodo) {
            const { tiempoInicio, tiempoFin } = getPeriodoTimes(periodo); // Obtiene los tiempos basados en el periodo
            query = `
                SELECT sp.* 
                FROM students_Session ss
                JOIN sessionPlanned sp ON ss.id_session = sp.id
                WHERE ss.id_student = ? AND (
                    (sp.start_hour BETWEEN ? AND ?) OR
                    (sp.end_hour BETWEEN ? AND ?)
                )`;
            params = [userId, tiempoInicio, tiempoFin, tiempoInicio, tiempoFin];
            
        } else {
            query = `
                SELECT sp.* 
                FROM students_Session ss
                JOIN sessionPlanned sp ON ss.id_session = sp.id
                WHERE ss.id_student = ?`;
            params = [userId];
        }

        const [results] = await pool.query(query, params);
        console.log(results);
        if (results.length > 0) {
            res.json({ success: true, sessions: results });
        } else {
            res.json({ success: true, message: "No sessions found", sessions: [] });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// Esta función ahora simplemente devuelve los tiempos de inicio y fin para el periodo dado
function getPeriodoTimes(periodo) {
    let tiempoInicio, tiempoFin;
    switch (periodo) {
        case 'manana':
            tiempoInicio = '06:00:00';
            tiempoFin = '11:59:59';
            break;
        case 'tarde':
            tiempoInicio = '12:00:00';
            tiempoFin = '17:59:59';
            break;
        case 'noche':
            tiempoInicio = '18:00:00';
            tiempoFin = '23:59:59';  // Ajuste aquí si necesitas considerar horas después de medianoche
            break;
        default:
            throw new Error('Periodo no válido. Debe ser "manana", "tarde" o "noche".');
    }
    return { tiempoInicio, tiempoFin };
};


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
