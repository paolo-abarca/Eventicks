import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import EventEditor from "./EventEditor";
import TicketEditor from "./TicketEditor";
import ReactPlayer from 'react-player';
import { Title, SubTitle, StyledButton, 
  MainContainer, TitleContainer, TitleT, Number, 
  Img, SubTitle1} from './someStyle.js';

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
      <TitleContainer>
      <Title> Mis eventos</Title>
      </TitleContainer>
      <MainContainer>
      {loading ? (
        <SubTitle>Cargando Eventos...</SubTitle>
      ) : events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            {editingEvent === event.id ? (
              <EventEditor
                event={event}
                onCancel={handleCancelEdit}
                onSave={(data) => handleSaveEdit(event.id, data)}
              />
            ) : (
              <div>
                <TitleContainer>
                <Number>1</Number><TitleT>Detalles del Evento</TitleT>
                </TitleContainer>
                <p><Img src={event.photo_event} alt="Imagen de evento" width="1100px"/></p>
                <SubTitle>Nombre del Evento: </SubTitle>
                <SubTitle1>{event.name_event}</SubTitle1>
                <SubTitle>Fecha de Inicio: </SubTitle>
                <SubTitle1>{formatDate(event.date_start)} </SubTitle1>
                <SubTitle>Fecha Final: </SubTitle>
                <SubTitle1>{formatDate(event.date_end)}</SubTitle1>
                <SubTitle>Hora de Inicio: </SubTitle>
                <SubTitle1>{formatTime(event.start_time)}</SubTitle1>
                <SubTitle>Hora Final: </SubTitle>
                <SubTitle1>{formatTime(event.end_time)}</SubTitle1>
                <SubTitle>Categoría: </SubTitle>
                <SubTitle1>{event.name_category}</SubTitle1>
                <SubTitle>Link de Video: </SubTitle>
                <div className='video'>
                <ReactPlayer
                url= {event.video}
                controls
                volume= '0.5'
                loop
                className='react-player'
                  />
                </div>
                <SubTitle>Restricción: </SubTitle>
                <SubTitle1>{event.restriction}</SubTitle1>
                <SubTitle>Visibilidad: </SubTitle>
                <SubTitle1>{event.visibility}</SubTitle1>
                <SubTitle>Descripción: </SubTitle>
                <SubTitle1>{event.description}</SubTitle1>
                <SubTitle>Información Adicional: </SubTitle>
                <SubTitle1>{event.information}</SubTitle1>

                <TitleContainer>
                <Number>2</Number><TitleT>Ubicación</TitleT>
                </TitleContainer>
                <SubTitle>Ciudad: </SubTitle>
                <SubTitle1>{event.city}</SubTitle1>
                <SubTitle>Dirección: </SubTitle>
                <SubTitle1>{event.address}</SubTitle1>
                <SubTitle>Referencia: </SubTitle>
                <SubTitle1>{event.reference}</SubTitle1>

                {user.id === event.id_user && (
                  <div>
                    <StyledButton onClick={() => handleEdit(event.id)}>Editar</StyledButton>
                    <StyledButton onClick={() => handleDeleteEvent(event.id)}>Eliminar</StyledButton>
                  </div>
                )}
              </div>
            )}
            <TitleContainer>
            <Number>3</Number><TitleT>Tickets</TitleT>
            </TitleContainer>
            {event.tickets.map((ticket) => (
              <div key={ticket.id}>
                {editingTicket === ticket.id ? (
                  <TicketEditor
                    ticket={ticket}
                    onCancel={handleCancelEditTicket}
                    onSave={(data) => handleSaveEditTicket(ticket.id, data)}
                  />
                ) : (
                  <div>
                      <SubTitle>Nombre del Ticket: </SubTitle>
                      <SubTitle1>{ticket.type}</SubTitle1>
                      <SubTitle>Precio: </SubTitle>
                      <SubTitle1>{ticket.currency} {ticket.price}</SubTitle1>
                      <SubTitle>Cantidad: </SubTitle>
                      <SubTitle1>{ticket.amount_ticket}</SubTitle1>

                      {event.id === ticket.id_event && (
                        <div>
                          <StyledButton onClick={() => handleEditTicket(ticket.id)}>Editar</StyledButton>
                          <StyledButton onClick={() => handleDeleteTicket(ticket.id)}>Eliminar</StyledButton>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No tienes eventos registrados.</p>
      )}
          </MainContainer>
      </div>
  );
}
