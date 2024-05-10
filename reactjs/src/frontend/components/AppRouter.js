import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../views/Login';
import Sessions from '../views/Sessions';
import Register from '../views/Register';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/register" element={<Register/>} />
        {/* Más rutas pueden ser agregadas aquí */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
