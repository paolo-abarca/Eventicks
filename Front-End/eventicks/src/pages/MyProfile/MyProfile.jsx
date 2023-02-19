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
    photo_user: user.photo_user,

  });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    const changedValues = Object.keys(userValues).reduce((result, key) => {
      if (userValues[key] !== user[key] && userValues[key] !== 'password') {
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

  const handleChangePassword = () => {
    axios.put(`http://localhost:5000/api/users/${user.id}`, {
      password: userValues.password,
    })
      .then(() => {
        alert('Password changed successfully');
        setUserValues({ ...userValues, password: '' });
      })
      .catch((error) => {
        console.log(error);
        alert('Error changing password');
      });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  return (
    <div>
      <button onClick={handleEdit}>Edit Profile</button>
      {editing ? (
        <div>
          <label htmlFor="name_user">Name</label>
          <input
            type="text"
            name="name_user"
            id="name_user"
            value={userValues.name_user}
            onChange={handleInputChange}
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={userValues.last_name}
            onChange={handleInputChange}
          />
          <label htmlFor="document_type">Document Type</label>
          <input
            type="text"
            name="document_type"
            id="document_type"
            value={userValues.document_type}
            onChange={handleInputChange}
          />
          <label htmlFor="number_document">Number Document</label>
          <input
            type="text"
            name="number_document"
            id="number_document"
            value={userValues.number_document}
            onChange={handleInputChange}
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={userValues.country}
            onChange={handleInputChange}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={userValues.city}
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userValues.phone}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      ) : (
        <div>
          <img src="" alt="Foto de perfil" />ls
          <div>Nombre: {userValues.name_user}</div>
          <div>Apellido: {userValues.last_name}</div>
          <div>Tipo de Doc: {userValues.document_type}</div>
          <div>N° de Doc: {userValues.number_document}</div>
          <div>País: {userValues.country}</div>
          <div>Ciudad: {userValues.city}</div>
          <div>Telefono: {userValues.phone}</div>
          <div>Contreña: ****** </div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userValues.password}
            onChange={handleInputChange}
          />

          <button onClick={handleChangePassword}>Change Password</button>
          
        </div>
      )}
    </div>
  );
};

export default MyProfile;

