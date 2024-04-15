// Register.js
import React, { useState } from 'react';
import { handleRegisterClick, handleLoginClick } from '../ContainerActions';  
import Button from '../components/Button';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // O el valor predeterminado que desees

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Registrando', { email, password, role });
  };

   const toggleView = () => {
    handleRegisterClick();  
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <span>Usa tu correo electrónico UVG</span>
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
        <div className="select-container">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
