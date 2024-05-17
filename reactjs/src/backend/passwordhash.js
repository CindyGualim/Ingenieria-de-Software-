const bcrypt = require('bcrypt');
const pool = require('./Connection');

async function passwordhash() {
    const connection = await pool.getConnection();
    await connection.beginTransaction();  // Start a new transaction
    try {
        const userEmail = 'pepe@gmail.com';  // Email del usuario específico
        const [users] = await connection.query('SELECT id, password FROM user WHERE email = ?', [userEmail]);

        if (users.length > 0) {
            const user = users[0];
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await connection.query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, user.id]);
            console.log(`Password updated for user ID: ${user.id}`);
            await connection.commit();  // Commit the transaction if update is successful
        } else {
            console.log('No user found with the specified email');
            await connection.rollback();  // Rollback the transaction as no user was found
        }
    } catch (error) {
        await connection.rollback();  // Rollback the transaction on error
        console.error('Error updating password:', error);
    } finally {
        connection.release();
    }
}

passwordhash();
