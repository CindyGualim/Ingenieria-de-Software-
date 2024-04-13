// Register.js
import React, { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // O el valor predeterminado que desees

  const handleRegister = async (event) => {
    event.preventDefault();
    // Aquí añadirías la lógica para enviar los datos al servidor
    console.log('Registrando', { email, password, role });
    // ...
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
