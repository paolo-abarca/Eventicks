import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import EventEditor from "./EventEditor";
import TicketEditor from "./TicketEditor";

export default function MyEvents({ user }) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user.id}/my_events`)
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      });
  }, [user.id]);

  const formatDate = (date) => {
    const day = daysDict[moment(date).locale("en").format("dddd")];
    const month = monthsDict[moment(date).locale("en").format("MMMM")];
    return `${day}, ${moment(date).format("D")} de ${month} de ${moment(date).format("YYYY")}`;
  };

  const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("HH:mm A");
  };

  const handleEdit = (eventId) => {
    setEditingEvent(eventId);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleSaveEdit = (eventId, data) => {
    axios
      .put(`http://localhost:5000/api/events/${eventId}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setEditingEvent(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}/my_events`)
          .then((response) => {
            setEvents(response.data);
          });
        alert("Evento Actualizado")
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      axios
        .delete(`http://localhost:5000/api/events/${eventId}`)
        .then(() => {
          axios
            .get(`http://localhost:5000/api/users/${user.id}/my_events`)
            .then((response) => {
              setEvents(response.data);
            });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditTicket = (ticketId) => {
    setEditingTicket(ticketId);
  };

  const handleCancelEditTicket = () => {
    setEditingTicket(null);
  };

  const handleSaveEditTicket = (ticketId, data) => {
    axios
      .put(`http://localhost:5000/api/tickets/${ticketId}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setEditingTicket(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}/my_events`)
          .then((response) => {
            setEvents(response.data);
          });
        alert("Ticket Actualizado")
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este ticket?")) {
      axios
        .delete(`http://localhost:5000/api/tickets/${ticketId}`)
        .then(() => {
          axios
            .get(`http://localhost:5000/api/users/${user.id}/my_events`)
            .then((response) => {
              setEvents(response.data);
            });
         })
         .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h1>Mis Eventos</h1>
      {loading ? (
        <p>Cargando Eventos...</p>
      ) : events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <hr />
            {editingEvent === event.id ? (
              <EventEditor
                event={event}
                onCancel={handleCancelEdit}
                onSave={(data) => handleSaveEdit(event.id, data)}
              />
            ) : (
              <div>
                <h2>1.- Detalles del Evento</h2>
                <span><b>Imagen: </b></span>
                <p>{event.photo_event}</p>
                <span><b>Nombre del Evento: </b></span>
                <p>{event.name_event}</p>
                <span><b>Fecha de Inicio: </b></span>
                <p>{formatDate(event.date_start)} </p>
                <span><b>Fecha Final: </b></span>
                <p>{formatDate(event.date_end)}</p>
                <span><b>Hora de Inicio: </b></span>
                <p>{formatTime(event.start_time)}</p>
                <span><b>Hora Final: </b></span>
                <p>{formatTime(event.end_time)}</p>
                <span><b>Categoría: </b></span>
                <p>{event.name_category}</p>
                <span><b>Link de Video: </b></span>
                <p>{event.video}</p>
                <span><b>Restricción: </b></span>
                <p>{event.restriction}</p>
                <span><b>Visibilidad: </b></span>
                <p>{event.visibility}</p>
                <span><b>Descripción: </b></span>
                <p>{event.description}</p>
                <span><b>Información Adicional: </b></span>
                <p>{event.information}</p>

                <h2>2.- Ubicación</h2>
                <span><b>Ciudad: </b></span>
                <p>{event.city}</p>
                <span><b>Dirección: </b></span>
                <p>{event.address}</p>
                <span><b>Referencia: </b></span>
                <p>{event.reference}</p>

                {user.id === event.id_user && (
                  <div>
                    <button onClick={() => handleEdit(event.id)}>Editar</button>
                    <button onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
                  </div>
                )}
              </div>
            )}
            <h2>3.- Tickets</h2>
            {event.tickets.map((ticket) => (
              <div key={ticket.id}>
                {editingTicket === ticket.id ? (
                  <TicketEditor
                    ticket={ticket}
                    onCancel={handleCancelEditTicket}
                    onSave={(data) => handleSaveEditTicket(ticket.id, data)}
                  />
                ) : (
                  <ul>
                    <li>
                      <span><b>Nombre del Ticket: </b></span>
                      <p>{ticket.type}</p>
                      <span><b>Precio: </b></span>
                      <p>{ticket.currency} {ticket.price}</p>
                      <span><b>Cantidad: </b></span>
                      <p>{ticket.amount_ticket}</p>

                      {event.id === ticket.id_event && (
                        <div>
                          <button onClick={() => handleEditTicket(ticket.id)}>Editar</button>
                          <button onClick={() => handleDeleteTicket(ticket.id)}>Eliminar</button>
                        </div>
                      )}
                    </li>
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No tienes eventos registrados.</p>
      )}
    </div>
  );
}
