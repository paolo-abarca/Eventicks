import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

// Páginas
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import AboutUs from "./pages/AboutUs/AboutUs";
import MyProfile from "./pages/MyProfile/MyProfile";

const App = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    // Aquí debería ir la lógica de inicio de sesión y verificación de la autenticación con la base de datos
    // ...
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Aquí debería ir la lógica de cierre de sesión
    // ...
    setIsAuthenticated(false);
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/mi-perfil">Mi Perfil</Link></li>
              <li><button><Link to="/crear-evento">Crear Evento</Link></button></li>
              <li><button onClick={handleLogout}>Cerrar Sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/registrar">Registrar</Link></li>
            </>
          )}
          <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
        </ul>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated ? (
          <>
            <Route path="/crear-evento" element={<CreateEvent />} />
            <Route path="/mi-perfil" element={<MyProfile />} />
          </>
        ) : null}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/registrar" element={<Register />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;