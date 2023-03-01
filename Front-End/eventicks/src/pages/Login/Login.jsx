//Login.jsx
import React, { useState } from "react";
import { LoginContainer, Title, 
        BeautyContainer,  
        Acount, StyledButton, 
        StyledLink, Input} from "./someStyle";
import Register from '../Register/Register';
import { Route, Routes,} from "react-router-dom";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    handleLogin(email, password);
  };

  return (
    <LoginContainer>
      <Title>Log in</Title>
      <form onSubmit={handleSubmit}>
        <label>
          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <BeautyContainer></BeautyContainer>
        <label>
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <BeautyContainer></BeautyContainer>
        <StyledButton type="submit">Iniciar Sesión</StyledButton>
      </form>
      <Acount>¿No tienes cuenta?</Acount>
      <StyledLink to= "/registrar">Registrate aqui</StyledLink>

      <Routes>
      <Route path="/registrar" element={<Register  />} />
      </Routes>
    </LoginContainer>
  );
};

export default Login;