// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name_user} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Apellido:
          <input type="text" value={last_name} onChange={(event) => setLastName(event.target.value)} required />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <label>
          Teléfono:
          <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </label>
        <label>
          País:
          <input type="text" value={country} onChange={(event) => setCountry(event.target.value)} required />
        </label>
        <label>
          Ciudad:
          <input type="text" value={city} onChange={(event) => setCity(event.target.value)} required />
        </label>
        <label>
          Género:
          <select value={gender} onChange={(event) => setGender(event.target.value)} required>
            <option value="">Selecciona una opción</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;