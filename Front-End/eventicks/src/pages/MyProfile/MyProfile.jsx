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
  const [userId, setUserId] = useState(null); // Establecemos el valor inicial de userId como null

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(res.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
          if (err.response && err.response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleEdit = (userId) => {
    setEditingUser(userId);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveEdit = (userId, data) => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:5000/api/users/${userId}`, data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
	},
      })
      .then(() => {
        setEditingUser(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
	  })
          .then((response) => {
            setUsers(response.data);
          }).catch((error) => {
            if (error.response && error.response.status === 401) {
              alert('Debe volver a iniciar sesión');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          });
        alert("Usuario Actualizado");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Debe volver a iniciar sesión');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        console.error(error)
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
	})
        .then(() => {
          // Eliminar la sesión del usuario en el cliente
          localStorage.removeItem('token');
          // Redireccionar a la página de inicio de sesión
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
	  console.error(error)
	});
    }
  };

  const handlePasswordEdit = () => {
    setEditingPassword(true);
  };

  const handlePasswordSave = (userId, password) => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:5000/api/users/${user.id}/password`, { password }, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
	},
      })
      .then(() => {
        setEditingPassword(false);
        axios
          .get(`http://localhost:5000/api/users/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
	  })
          .then((response) => {
            setUsers(response.data);
          }).catch((error) => {
            if (error.response && error.response.status === 401) {
              alert('Debe volver a iniciar sesión');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          });
        alert("Contraseña Actualizada");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Debe volver a iniciar sesión');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        console.error(error)
      });
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
              <SubTitle>Número de Documento</SubTitle>
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
