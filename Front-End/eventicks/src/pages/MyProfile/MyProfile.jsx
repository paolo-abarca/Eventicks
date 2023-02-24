import React, { useState, useEffect } from "react";
import axios from "axios";
import UserEditor from "./UserEditor";

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
          window.location.href = "/login";
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
      <h1>Información de mi cuenta</h1>
      {loading ? (
        <p>Cargando Datos...</p>
      ) : Object.keys(users).length > 0 ? (
        <div key={users.id}>
          <hr />
          {editingUser === users.id ? (
            <UserEditor
              user={users}
              onCancel={handleCancelEdit}
              onSave={(data) => handleSaveEdit(users.id, data)}
            />
          ) : (
            <div>
              <span><b>Nombres: </b></span>
              <p>{users.name_user}</p>
              <span><b>Apellidos: </b></span>
              <p>{users.last_name}</p>
              <span><b>Imagen: </b></span>
              <p>{users.photo_event}</p>
              <span><b>Tipo de Documento: </b></span>
              <p>{users.document_type}</p>
              <span><b>Numero de Documento: </b></span>
              <p>{users.number_document}</p>
              <span><b>País: </b></span>
              <p>{users.country}</p>
              <span><b>Ciudad: </b></span>
              <p>{users.city}</p>
              <span><b>Correo Electrónico: </b></span>
              <p>{users.email}</p>
              <span><b>Teléfono: </b></span>
              <p>{users.phone}</p>
              <span><b>Contraseña: </b></span>
              {editingPassword ? (
                <div>
                  <input
                    type="password"
                    placeholder="Nueva Contraseña"
                    onChange={(e) => setPassword(e.target.value)} required
                  />
                  <button onClick={() => handlePasswordSave(users.id, password)}>Guardar</button>
                  <button onClick={() => setEditingPassword(false)}>Cancelar</button>
                </div>
              ) : (
                <div>
                  <p>**********</p>
                  <button onClick={() => handlePasswordEdit(users.id)}>Cambiar Contraseña</button>
                </div>
              )}

              {user.id === users.id && (
                <div>
                  <button onClick={() => handleEdit(user.id)}>Editar</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) :(
      <p>No tienes Datos registrados.</p>
    )}
  </div>
);
}
