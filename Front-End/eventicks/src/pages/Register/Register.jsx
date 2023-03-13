// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cities } from "../../utils/cities.js";
import { LoginContainer, Title, 
  BeautyContainer, StyledButton, 
  Input, Select} from "./someStyle";

const Register = () => {
  const [name_user, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/users", {
        name_user,
        last_name,
        email,
        password,
        phone,
        country,
        city,
        gender,
      })
      .then((response) => {
        console.log(response.data);
        alert("Registro exitoso.");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          if (error.response.data === "Email has already been used") {
            alert("Este correo electrónico ya ha sido utilizado. Por favor ingresa otro correo electrónico.");
          } else {
            alert("Ocurrió un error al registrar al usuario. Por favor inténtalo de nuevo.");
          }
        } else {
          setErrorMessage("Ocurrió un error al registrar al usuario. Por favor inténtalo de nuevo.");
        }
      });
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <LoginContainer>
      {errorMessage && <div>{errorMessage}</div>}
      <Title>Bienvenido a Eventicks</Title>
      <form onSubmit={handleSubmit}>
        <label>
          <Input type="text" value={name_user} maxlength="49" placeholder="Nombres" onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          <Input type="text" value={last_name} maxlength="49" placeholder="Apellidos" onChange={(event) => setLastName(event.target.value)} required />
        </label>
        <BeautyContainer></BeautyContainer>
        <label>
          <Input type="email" value={email} maxlength="49" placeholder="Correo Electrónico" onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          <Input type="password" value={password} placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <BeautyContainer></BeautyContainer>
        <label>
          <Input type="number" min="0" placeholder="Teléfono" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <label>
          <Input type="text" value={country} maxlength="19" placeholder="País" onChange={(event) => setCountry(event.target.value)} required />
        </label>
        <BeautyContainer></BeautyContainer>
        <label>
          <Select value={city} onChange={(event) => setCity(event.target.value)} required >
	    <option value="">Selecciona una Ciudad</option>
	    {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </Select>
        </label>
        <label>
          <Select value={gender} onChange={(event) => setGender(event.target.value)} required>
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </Select>
        </label>
        <BeautyContainer></BeautyContainer>
        <BeautyContainer></BeautyContainer>
        <label>
        <input type="checkbox" required /> <span>He leído y acepto los <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones.</a>.</span>
        <br />
        <br />
        </label>
        <StyledButton type="submit">Registrarse</StyledButton>
      </form>
    </LoginContainer>
  );
};

export default Register;
