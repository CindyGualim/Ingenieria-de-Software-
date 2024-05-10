import React from 'react';
import Button from '../components/Button.js';


const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Button onClick={closeSidebar} className="close-sidebar">X</Button>
      <ul className="sidebar-items">
        <li>Perfil</li>
        <li>Buscar Tutores</li>
        <li>Calendario</li>
        <li>Historial sesiones</li>
        <li>Chat</li>
        <li>Cerrar sesión</li>
      </ul>
    </div>
  );
};
export default Sidebar;
