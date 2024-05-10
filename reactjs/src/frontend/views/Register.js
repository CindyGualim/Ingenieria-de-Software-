import React, { useState } from 'react';
import Button from '../components/Button.js';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación


  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });

      const data = await response.json();

      if (data.success) {
        alert('Registro exitoso');
        navigate('/login'); // Redirige a la vista de inicio de sesión
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Hubo un problema al registrar al usuario. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <span>Usa tu correo electrónico UVG</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
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
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <div className="select-container">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>
        {error && <span className="error">{error}</span>}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
