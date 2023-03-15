import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Link, Routes, useNavigate, useLocation } from "react-router-dom";
import { Navbar , LeftContainer, LogoA, MainContainer, UltimateContainer} from './App.js';
import Logo from "./img/logo.png"
import axios from 'axios'
import jwt_decode from "jwt-decode";

// Páginas
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import AboutUs from "./pages/AboutUs/AboutUs";
import MyProfile from "./pages/MyProfile/MyProfile";
import BuyTickets from "./pages/BuyTickets/BuyTickets";
import MyEvents from "./pages/MyEvents/MyEvents";
import MyTickets from "./pages/MyTickets/MyTickets";
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();  // Obtiene la función de navegación
  const [user, setUser] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null); // Almacena la ubicación anterior
  const location = useLocation(); // Obtiene la ubicación actual

  const handleLogin = useCallback(async (email, password, token) => {
    try {
      const storedToken = localStorage.getItem("token");
  
      // Si el usuario ya está autenticado con las credenciales almacenadas en el localStorage, no es necesario hacer otra solicitud al servidor
      if (token === storedToken) {
        setIsAuthenticated(true);
        alert("¡Bienvenido! Te has autenticado correctamente.");
  
        const decodedToken = jwt_decode(storedToken);
        const dataUser = decodedToken.DataUser;
        const storedUser = dataUser;
        if (storedUser) {
          setUser(storedUser);
        }
  
        // Redirige al usuario a la ubicación anterior después de la autenticación
        navigate(prevLocation || '/');
  
        // Navega a la página de inicio después de la autenticación
        navigate('/');
  
        setErrorMessage(null); // Restablece el mensaje de error a null
  
      } else {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
  
        const { token } = response.data;
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.user_id;

        if (response.status === 200 ) {
          setIsAuthenticated(true);
          alert("¡Bienvenido! Te has autenticado correctamente.");
  
          const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
	  });

          const user = userResponse.data;
          setUser(user);
  
          // Almacena las credenciales y los datos del usuario en el localStorage
          localStorage.setItem("token", token);
  
          // Redirige al usuario a la ubicación anterior después de la autenticación
          navigate(prevLocation || '/');
  
          // Navega a la página de inicio después de la autenticación
          navigate('/');
  
          setErrorMessage(null); // Restablece el mensaje de error a null
  
        } else {
          setErrorMessage("El correo electrónico o la contraseña son incorrectos.");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        alert("Password Incorrecto");
      } else if (error.response && error.response.status === 404) {
        alert("Correo no encontrado");
      } else {
        alert("Hubo un error al iniciar sesión. Inténtelo de nuevo más tarde.");
      }
    }
  }, [navigate, prevLocation]);

const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.clear();
    navigate('/login'); // Navega a la página de inicio de sesión
    }, [navigate]);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
  
      // Si el usuario ya está autenticado con las credenciales almacenadas en el localStorage, establece el estado de autenticación en verdadero
      if (storedToken) {
        setIsAuthenticated(true);
        const decodedToken = jwt_decode(storedToken);
        const dataUser = decodedToken.DataUser;
        const storedUser = dataUser;
        if (storedUser) {
          setUser(storedUser);
        }
      } else {
        setIsAuthenticated(false);
      }
  
      // Almacena la ubicación anterior al cambiar de ubicación
      if (location.pathname !== "/login" && location.pathname !== "/register") {
        setPrevLocation(location.pathname);
      }
    }, [location]);

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <Navbar>
        <UltimateContainer>
        <LeftContainer>
          <Link to="/"><LogoA src={Logo} alt="logo"/></Link>
         </LeftContainer>
         <MainContainer>
          {isAuthenticated ? (
            <>
              <Link to="/mi-perfil">Mi Perfil</Link>
              <Link to="/mis-eventos">Mis Eventos</Link>
              <Link to="/mis-tickets">Mis Tickets</Link>
              <Link to="/crear-evento">Crear Evento</Link>
              <button className="btn-logout" onClick={handleLogout} style={{ textAlign: "center" }}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
            </>
          )}
          </MainContainer>
        </UltimateContainer>
      </Navbar>
      
      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated}/>} />
        {isAuthenticated ? (
          <>
            <Route path="/crear-evento" element={<CreateEvent user={user} />} />
            <Route path="/mi-perfil" element={<MyProfile user={user} />} />
            <Route path="/mis-eventos" element={<MyEvents user={user} />} />
            <Route path="/mis-tickets" element={<MyTickets user={user}/>} />
            <Route path="/comprar-tickets/:eventId" element={<BuyTickets user={user} />} />
          </>
        ) : null}
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/registrar" element={<Register  />} />
        <Route path="/sobre-nosotros" element={<AboutUs />} />
        <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
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
