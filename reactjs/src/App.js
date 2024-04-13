import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Input from './components/Input';
import Button from './components/Button';
import Footer from './components/Footer';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Attempting to login with:", { email, password }); // Log the credentials being sent

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      console.log("Server response:", response);

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error('Server responded with:', errorData);
          alert(`Login failed: ${errorData.message}`);
        } catch (jsonError) {
          const errorText = await response.text();
          console.error('Server responded with non-JSON:', errorText);
          alert(`Login failed: ${errorText}`);
        }
        return;  // Exit the function after handling the error
      }

      const data = await response.json();
      console.log('Login Successful:', data);
      alert('Login Successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: Unexpected error occurred.');
    }
  };

  return (
    <div>
      <Header title="Sign In" />
      <div className='container' id='container'>
        <div className='form-container sign-in'>
          <form onSubmit={handleLogin}>
            <span>Use your Email and Password to sign in</span>
            <Input type="email" placeholder="Correo Electronico" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Ingresa tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit">Sign in</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
