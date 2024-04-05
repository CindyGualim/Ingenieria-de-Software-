// en esta pagina vamos a renderizar el login con los componentes. 
import React from 'react';
import './App.css';
// importamos componentes.
import Header from './components/Header';
import Input from './components/Input';
import Button from './components/Button';
import Footer from './components/Footer';

// se necesitan agregar las funciones de olvidarContra y agregarle el metodo onClick al boton para ingresar...
function App() {
return (
  <div>
  <Header title="Sign In"></Header>
  <div className='container' id='container'>
    <div className='form-container sign-in'>
      <form>
        <span> Usea tu Correo y contraseña para ingresar </span>
        <Input type="email" placeholder="Correo Electronico" />
        <Input type="password" placeholder="Ingresa tu contraseña" />
        <Button>Sign in</Button>
      </form>
    </div>
  </div>
  <Footer /> 
  </div>
);

}

export default App; 