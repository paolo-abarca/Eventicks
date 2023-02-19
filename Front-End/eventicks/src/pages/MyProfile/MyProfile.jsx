import React, { useState } from 'react';
import axios from 'axios';

const MyProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [userValues, setUserValues] = useState({
    name_user: user.name_user,
    last_name: user.last_name,
    document_type: user.document_type,
    number_document: user.number_document,
    country: user.country,
    city: user.city,
    phone: user.phone,
    photoUser: user.photo_user,
    password: '1111'
  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    const changedValues = Object.keys(userValues).reduce((result, key) => {
      if (userValues[key] !== user[key]) {
        result[key] = userValues[key];
      }
      return result;
    }, {});

    axios.put(`http://localhost:5000/api/users/${user.id}`, changedValues)
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  return (
    <div>
      <h1>Información de mi cuenta</h1>
      <img src="" alt="Foto de perfil" />
      {user && (
        <div>
          {editing ? (
            <div>
              <p>Nombre:</p>
              <input 
                type="text"
                name="name_user"
                value={userValues.name_user}
                onChange={handleInputChange}
              />
  
              <p>Apellido:</p>
              <input 
                type="text"
                name="last_name"
                value={userValues.last_name}
                onChange={handleInputChange}
              />
  
              <p>Tipo de Documento:</p>
              <input 
                type="text"
                name="document_type"
                value={userValues.document_type}
                onChange={handleInputChange}
              />
  
              <p>Numero de Documento:</p>
              <input 
                type="number"
                name="number_document"
                value={userValues.number_document}
                onChange={handleInputChange}                 
              />
  
              <p>Correo electrónico: {user.email}</p>
  
              <p>Pais:</p>
              <input 
                type="text"
                name="country"
                value={userValues.country}
                onChange={handleInputChange}
              />
  
              <p>  Ciudad:</p>
              <input 
                type="text"
                name="city"
                value={userValues.city}
                onChange={handleInputChange}
              />
  
              <p> Telefono:</p>
              <input 
                type="number"
                name="phone"
                value={userValues.phone}
                onChange={handleInputChange}
              />
  
              <p> Contraseña:</p>
              <input
                type="password"
                name="password"
                value={userValues.password}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div>
              <p>Nombre: {userValues.name_user}</p>
              <p>Apellido: {userValues.last_name}</p>
              <p>Tipo de Documento: {userValues.document_type}</p>
              <p>Numero de Documento: {userValues.number_document}</p>
              <p>Correo electrónico: {user.email}</p>
              <p>Pais: {userValues.country}</p>
              <p>Ciudad: {userValues.city}</p>
              <p>Telefono: {userValues.phone}</p>
              {/* Mostrar más información del usuario aquí */}
            </div>
          )}
          {editing ? (
            <button onClick={handleUpdate}>Actualizar</button>
          ) : (
            <button onClick={handleEdit}>Editar</button>
          )}
        </div>
      )}
    </div>
  );
};
export default MyProfile;

