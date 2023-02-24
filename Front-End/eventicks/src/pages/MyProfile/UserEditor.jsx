import React, { useState } from "react";
import { cities } from "../../utils/cities.js";

export default function UserEditor({ user, onCancel, onSave }) {
  const [name_user, setName_user] = useState(user.name_user);
  const [last_name, setLast_name] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [photo_user, setPhoto_user] = useState(user.photo_user);
  const [document_type, setDocument_type] = useState(user.document_type);
  const [number_document, setNumber_document] = useState(user.number_document);

  const handleSubmit = (user) => {
    user.preventDefault();

    const data = {
      name_user: name_user,
      last_name: last_name,
      email: email,
      phone: phone,
      country: country,
      city: city,
      photo_user: photo_user,
      document_type: document_type,
      number_document: number_document
    };

    onSave(data);
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span><b>Nombres: </b></span>
          <input
            type="text" maxlength="49" placeholder="Nombres"
            value={name_user}
            onChange={(e) => setName_user(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Apellidos: </b></span>
          <input
            type="text" maxlength="49" placeholder="Apellidos"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Imagen: </b></span>
          <input
            type="text"
            value={photo_user}
            onChange={(e) => setPhoto_user(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span><b>Tipo de Documento: </b></span>
          <select
            value={document_type}
            onChange={(e) => setDocument_type(e.target.value)} required>
	    <option value="">Selecciona el tipo de Documento</option>
             <option value="DNI">DNI</option>
             <option value="Pasaporte">Pasaporte</option>
             <option value="Carné de extranjeria">Carné de extranjeria</option>
	     <option value="RUC">RUC</option>
	     <option value="Otro">Otro</option>
          </select>
        </label>
        <br />
        <label>
          <span><b>Número de Documento: </b></span>
          <input
            type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } placeholder="Número de Documento"
            value={number_document}
            onChange={(e) => setNumber_document(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span><b>País: </b></span>
          <input
            type="text" maxlength="19" placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Ciudad: </b></span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)} required>
	    {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
        <br />
        <label>
          <span><b>Correo Electrónico: </b></span>
          <input
            type="text"
            value={email} maxlength="49" placeholder="Correo Electrónico"
            onChange={(e) => setEmail(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Teléfono: </b></span>
          <input
            type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } 
            value={phone} placeholder="Teléfono"
            onChange={(e) => setPhone(e.target.value)} required
          />
        </label>
	<br />
        <label>
          <span><b>Contraseña: </b></span>
	  <p>**********</p>
        </label>
        <button type="submit">Actualizar datos</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
