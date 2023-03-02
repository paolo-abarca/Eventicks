import React, { useState, useEffect } from "react";
import axios from "axios";
import UserEditor from "./UserEditor";
import { Title, SubTitle, StyledButton, MainContainer, FirstContainer, 
  SecondContainer, Img, SubTitle1, SubTitle2} from './someStyle.js';

export default function MyProfile({ user }) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPassword, setEditingPassword] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user.id}`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      });
  }, [user.id]);

  const handleEdit = (userId) => {
    setEditingUser(userId);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = (userId, data) => {
    axios
      .put(`http://localhost:5000/api/users/${userId}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setEditingUser(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}`)
          .then((response) => {
            setUsers(response.data);
          });
        alert("Usuario Actualizado");
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          // Eliminar la sesión del usuario en el cliente
          localStorage.removeItem("user");
          // Redireccionar a la página de inicio de sesión
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((error) => console.error(error));
    }
  };

  const handlePasswordEdit = () => {
    setEditingPassword(true);
  };

  const handlePasswordSave = (userId, password) => {
    axios
      .put(`http://localhost:5000/api/users/${user.id}/password`, { password }, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setEditingPassword(false);
        axios
          .get(`http://localhost:5000/api/users/${user.id}`)
          .then((response) => {
            setUsers(response.data);
          });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Title>Información de mi cuenta</Title>
      {loading ? (
        <SubTitle2>Cargando Datos...</SubTitle2>
      ) : Object.keys(users).length > 0 ? (
        <div key={users.id}>
          {editingUser === users.id ? (
            <UserEditor
              user={users}
              onCancel={handleCancelEdit}
              onSave={(data) => handleSaveEdit(users.id, data)}
            />
          ) : (
            <MainContainer>
              <FirstContainer>
              <SubTitle>Nombres </SubTitle>
              <SubTitle1>{users.name_user}</SubTitle1>
              <SubTitle>Apellidos </SubTitle>
              <SubTitle1>{users.last_name}</SubTitle1>    
              <SubTitle>Tipo de Documento </SubTitle>
              {users.document_type ?
              <SubTitle1>{users.document_type}</SubTitle1> :
              <SubTitle1>Selecciona un tipo de documento</SubTitle1>}
              <SubTitle>Numero de Documento </SubTitle>
              {users.number_document ?
              <SubTitle1>{users.number_document}</SubTitle1> :
              <SubTitle1>Ingresa tu numero de Documento</SubTitle1>}
              <SubTitle>País </SubTitle>
              <SubTitle1>{users.country}</SubTitle1>
              <SubTitle>Ciudad </SubTitle>
              <SubTitle1>{users.city}</SubTitle1>
              <SubTitle>Correo Electrónico </SubTitle>
              <SubTitle1>{users.email}</SubTitle1>
              <SubTitle>Teléfono </SubTitle>
              <SubTitle1>{users.phone}</SubTitle1>
              <SubTitle>Contraseña </SubTitle>
              {editingPassword ? (
                <div>
                  <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={(e) => setPassword(e.target.value)} required
                  />
                  <StyledButton onClick={() => handlePasswordSave(users.id, password)}>Guardar</StyledButton>
                  <StyledButton onClick={() => setEditingPassword(false)}>Cancelar</StyledButton>
                </div>
              ) : (
                <div>
                  <SubTitle1>**********</SubTitle1>
                  <br />
                  <StyledButton onClick={() => handlePasswordEdit(users.id)}>Cambiar Contraseña</StyledButton>
                </div>
              )}
              </FirstContainer>
              <SecondContainer>
              <SubTitle>Imagen: </SubTitle>
              {users.photo_user ?
              <p><Img src={users.photo_user} alt="Imagen de perfil" /></p> :
              <SubTitle1>Selecciona una foto</SubTitle1>}
              </SecondContainer>
              {user.id === users.id && (
                <div>
                  <StyledButton onClick={() => handleEdit(user.id)}>Editar</StyledButton>
                  <StyledButton onClick={() => handleDeleteUser(user.id)}>Eliminar</StyledButton>
                </div>
                
              )}
            </MainContainer>
          )}
        </div>
      ) :(
      <p>No tienes Datos registrados.</p>
    )}
  </div>
);
}
