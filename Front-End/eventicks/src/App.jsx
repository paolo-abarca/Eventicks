import React, { useState } from "react";
import { BrowserRouter, Route, Link, Routes, useNavigate } from "react-router-dom";
import axios from 'axios'

// Páginas
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import AboutUs from "./pages/AboutUs/AboutUs";
import MyProfile from "./pages/MyProfile/MyProfile";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();  // Obtiene la función de navegación
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const userId = response.data;
      if (response.status === 200 ) {
        setIsAuthenticated(true);
        alert("¡Bienvenido! Te has autenticado correctamente.");
        navigate('/'); // Navega a la página de inicio
        setErrorMessage(null); // Restablece el mensaje de error a null
      
        const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`); // Hace una solicitud GET a la API con el id del usuario
        console.log(userResponse.data); // Imprime el retorno de la API en la consola
        setUser(userResponse.data)
      } else {
        setErrorMessage("Ocurrió un error en el inicio de sesión");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data === "Password Incorrect") {
          alert("La contraseña es incorrecta");
        } else if (error.response.data === "Email Not Found") {
          alert("El correo electrónico no se encontra registrado");
        } else {
          alert("Ocurrió un error en el inicio de sesión");
        }
      } else {
        console.error(error);
        setErrorMessage("Ocurrió un error en el inicio de sesión");
      }
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Navega a la página de inicio
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
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
            <Route path="/mi-perfil" element={<MyProfile user={user} />} />
          </>
        ) : null}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/registrar" element={<Register  />} />
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