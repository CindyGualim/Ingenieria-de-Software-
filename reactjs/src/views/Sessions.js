import React, { useState, useEffect } from 'react';
import SessionCard from '../components/Card';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './Sessions.css';
import './Sidebar.css';
import './Navbar.css';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [periodo, setPeriodo] = useState('');  // Estado inicial vacío para el periodo

  const handlePeriodChange = (e) => {
    const newPeriodo = e.target.value;
    setPeriodo(newPeriodo);  // Actualiza el periodo y desencadena un nuevo efecto
  };

// Función para cargar sesiones
const fetchSessions = async (queryPeriodo = '') => {
    setLoading(true);
    const token = localStorage.getItem('token');
    // Construye la URL basada en si hay un periodo especificado
    const url = new URL('http://localhost:3001/sessions');
    if (queryPeriodo) url.searchParams.append('periodo', queryPeriodo);
    
    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSessions(data.sessions || []);
    } catch (error) {
        console.error("Could not fetch sessions:", error);
        setError(`Failed to fetch sessions: ${error.message || 'Unknown error'}`);
    } finally {
        setLoading(false);
    }
};



  useEffect(() => {
    fetchSessions();  // Carga inicial de todas las sesiones
  }, []);

  useEffect(() => {
    if (periodo) {  // Realiza una carga condicional basada en el periodo seleccionado
      fetchSessions(periodo);
    }
  }, [periodo]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  if (loading) return <div className="loading-message">Cargando...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <Navbar />
      <div className={`sessions-container ${isSidebarOpen ? 'shifted' : ''}`}>
        <button className="menu-toggle" onClick={toggleSidebar}>Menu</button>
        <h1 className="sessions-title">Próximas Sesiones</h1>
        <div className="session-filters">
          <label htmlFor="periodo-select">Elige el periodo:</label>
          <select id="periodo-select" value={periodo} onChange={handlePeriodChange} className="periodo-selector">
            <option value="">Todas las Sesiones</option>
            <option value="manana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>
        </div>
        <div>
          {sessions.length > 0 ? sessions.map(session => (
            <SessionCard
              key={session.id}
              date={session.date}
              time={session.time}
              subject={session.subject}
            />
          )) : <div className="no-sessions">No hay sesiones disponibles.</div>}
        </div>
      </div>
    </>
  );
}

export default Sessions;
