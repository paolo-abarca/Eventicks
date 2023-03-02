import React, { useState } from "react";
import { cities } from "../../utils/cities.js";
import axios from "axios";
import { SubTitle, StyledButton, 
  StyledSelect, StyledInput, MainContainer1, FirstContainer, 
  SecondContainer, Img, SubTitle1} from './someStyle.js';

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

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "preset-eventicks");
    axios
      .post("https://api.cloudinary.com/v1_1/cloud-eventicks/image/upload", formData)
      .then((response) => {
        console.log(response.data.secure_url)
        const imageUrl = response.data.secure_url;
    
        setPhoto_user(`${imageUrl.replace("/image/upload/", `/image/upload/w_250,h_250,c_fill,r_max/w_250,h_250,c_crop,g_face,r_max/`)}`);
      
        
        alert("Imagen cargada exitosamente");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
    <MainContainer1>
    <form onSubmit={handleSubmit}>
      <FirstContainer>
      <label>
          <SubTitle>Nombres </SubTitle>
          <StyledInput
            type="text" maxlength="49" placeholder="Nombres"
            value={name_user}
            onChange={(e) => setName_user(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <SubTitle>Apellidos </SubTitle>
          <StyledInput
            type="text" maxlength="49" placeholder="Apellidos"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)} required
          />
        </label>
        <label>
          <SubTitle>Tipo de Documento </SubTitle>
          <StyledSelect
            value={document_type}
            onChange={(e) => setDocument_type(e.target.value)} required>
	    <option value="">Selecciona el tipo de Documento</option>
             <option value="DNI">DNI</option>
             <option value="Pasaporte">Pasaporte</option>
             <option value="Carné de extranjeria">Carné de extranjeria</option>
	     <option value="RUC">RUC</option>
	     <option value="Otro">Otro</option>
          </StyledSelect>
        </label>
        <br />
        <label>
          <SubTitle>Número de Documento </SubTitle>
          <StyledInput
            type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } placeholder="Número de Documento"
            value={number_document}
            onChange={(e) => setNumber_document(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <SubTitle>País </SubTitle>
          <StyledInput
            type="text" maxlength="19" placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <SubTitle>Ciudad </SubTitle>
          <StyledSelect
            value={city}
            onChange={(e) => setCity(e.target.value)} required>
	    {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </StyledSelect>
        </label>
        <br />
        <label>
          <SubTitle>Correo Electrónico </SubTitle>
          <StyledInput
            type="text"
            value={email} maxlength="49" placeholder="Correo Electrónico"
            onChange={(e) => setEmail(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <SubTitle>Teléfono </SubTitle>
          <StyledInput
            type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } 
            value={phone} placeholder="Teléfono"
            onChange={(e) => setPhone(e.target.value)} required
          />
        </label>
	<br />
        <label>
          <SubTitle>Contraseña </SubTitle>
	  <SubTitle1>**********</SubTitle1>
        </label>
      </FirstContainer>
      <SecondContainer>
      <label>
        <SubTitle>Imagen </SubTitle>
        <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} />
        {photo_user ?
        <p><Img src={photo_user} alt="Imagen de perfil" /></p> :
        <p>Seleccione una foto</p>}
        </label>
        <StyledButton type="submit">Actualizar datos</StyledButton>
        <StyledButton type="button" onClick={onCancel}>
          Cancelar
        </StyledButton>
      </SecondContainer>
      </form>
    </MainContainer1>
    </div>
  );
}
