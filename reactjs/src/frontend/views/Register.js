import React, { useState } from 'react';
import { handleRegisterClick, handleLoginClick } from '../../ContainerActions';  
import Button from '../components/Button.js';
import '../css/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado para la confirmación de la contraseña
  const [role, setRole] = useState('student'); // O el valor predeterminado que desees
  const [error, setError] = useState(''); // Estado para manejar los errores de validación

  const handleRegister = async (event) => {
    event.preventDefault();
    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return; // No continuar con el registro
    }
    // Si no hay error, limpia el mensaje de error y continúa con el registro
    setError('');
    // Aquí añadirías la lógica para enviar los datos al servidor
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
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="Confirm Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
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

