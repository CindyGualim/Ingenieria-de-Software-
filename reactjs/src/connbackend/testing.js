const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./Connection');  // Asumiendo que tu archivo se llama Connection.js y está en la carpeta connbackend
const cors = require('cors');

const app = express();
app.use(cors());  // Permite solicitudes CORS de tu frontend
app.use(express.json());  // Para parsear JSON en el cuerpo de las solicitudes

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);
    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(
                'SELECT id FROM user WHERE email = ? AND password = ?',
                [email, password]
            );
            console.log(results);  // Ver qué está devolviendo la base de datos
            if (results.length > 0) {
                res.json({ success: true, message: "Login successful", user: results[0] });
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


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});