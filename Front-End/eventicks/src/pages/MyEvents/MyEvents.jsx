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
import Footer from '../Footer/Footer';
import { Lildiv } from "../MyProfile/someStyle.js";
import "./Event.css"

export default function MyEvents({ user }) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [userId, setUserId] = useState(null);

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
          const res = await axios.get(`http://localhost:5000/api/users/${userId}/my_events`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEvents(res.data);
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
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:5000/api/events/${eventId}`, data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
	},
      })
      .then(() => {
        setEditingEvent(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}/my_events`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
	  })
          .then((response) => {
            setEvents(response.data);
          }).catch((error) => {
            if (error.response && error.response.status === 401) {
              alert('Debe volver a iniciar sesión');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          });
        alert("Evento Actualizado")
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

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/api/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
	})
        .then(() => {
          axios
            .get(`http://localhost:5000/api/users/${user.id}/my_events`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
	    })
            .then((response) => {
              setEvents(response.data);
            }).catch((error) => {
              if (error.response && error.response.status === 401) {
                alert('Debe volver a iniciar sesión');
                localStorage.removeItem('token');
                window.location.href = '/login';
              }
            });
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

  const handleEditTicket = (ticketId) => {
    setEditingTicket(ticketId);
  };

  const handleCancelEditTicket = () => {
    setEditingTicket(null);
  };

  const handleSaveEditTicket = (ticketId, data) => {
    const token = localStorage.getItem('token');
    axios
      .put(`http://localhost:5000/api/tickets/${ticketId}`, data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
	},
      })
      .then(() => {
        setEditingTicket(null);
        axios
          .get(`http://localhost:5000/api/users/${user.id}/my_events`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
	  })
          .then((response) => {
            setEvents(response.data);
          }).catch((error) => {
            if (error.response && error.response.status === 401) {
              alert('Debe volver a iniciar sesión');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          });
        alert("Ticket Actualizado")
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

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este ticket?")) {
      const token = localStorage.getItem('token');
      axios
        .delete(`http://localhost:5000/api/tickets/${ticketId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
	})
        .then(() => {
          axios
            .get(`http://localhost:5000/api/users/${user.id}/my_events`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
	    })
            .then((response) => {
              setEvents(response.data);
            }).catch((error) => {
              if (error.response && error.response.status === 401) {
                alert('Debe volver a iniciar sesión');
                localStorage.removeItem('token');
                window.location.href = '/login';
              }
            });
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

  return (
    <div>
      <TitleContainer>
      <Title> Mis eventos</Title>
      </TitleContainer>
      {loading ? (
        <Lildiv><SubTitle>Cargando Eventos...</SubTitle></Lildiv>
      ) : events.length > 0 ? (
        events.map((event) => (
          <MainContainer key={event.id}>
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
                <div className="a">
                <div>
                <SubTitle>Nombre del Evento: </SubTitle>
                <SubTitle1>{event.name_event}</SubTitle1>
                </div>
                <div>
                <SubTitle>Fecha de Inicio: </SubTitle>
                <SubTitle1>{formatDate(event.date_start)} </SubTitle1>
                </div>
                <div><SubTitle>Fecha Final: </SubTitle>
                <SubTitle1>{formatDate(event.date_end)}</SubTitle1></div>
                <div><SubTitle>Hora de Inicio: </SubTitle>
                <SubTitle1>{formatTime(event.start_time)}</SubTitle1></div>
                <div>
                <SubTitle>Hora Final: </SubTitle>
                <SubTitle1>{formatTime(event.end_time)}</SubTitle1>
                </div>
                <div>
                <SubTitle>Categoría: </SubTitle>
                <SubTitle1>{event.name_category}</SubTitle1>
                </div>
                <div>
                <SubTitle>Restricción: </SubTitle>
                <SubTitle1>{event.restriction}</SubTitle1>
                </div>
                <div>
                <SubTitle>Visibilidad: </SubTitle>
                <SubTitle1>{event.visibility === 'yes' ? 'Si' : event.visibility}</SubTitle1>
                </div>
                </div>
                <SubTitle>Descripción: </SubTitle>
                <SubTitle1>{event.description}</SubTitle1>
                <SubTitle>Información Adicional: </SubTitle>
                {event["information"] !== "" ?
                <SubTitle1>{event.information}</SubTitle1> :
                <SubTitle1>No hay Información Adicional</SubTitle1>}
                <SubTitle>Link de Video: </SubTitle>
                {event["video"] !== "" ?
                <div className='video'>
                <ReactPlayer
                url= {event.video}
                controls
                volume= '0.5'
                loop
                className='react-player'
                  />
                </div> :
                <SubTitle1>No hay Video</SubTitle1>}

                <TitleContainer>
                <Number>2</Number><TitleT>Ubicación</TitleT>
                </TitleContainer>
                <SubTitle>Ciudad: </SubTitle>
                <SubTitle1>{event.city}</SubTitle1>
                <SubTitle>Dirección: </SubTitle>
                <SubTitle1>{event.address}</SubTitle1>
                <SubTitle>Referencia: </SubTitle>
                {event["reference"] !== "" ?
                <SubTitle1>{event.reference}</SubTitle1> :
                <SubTitle1>No hay Referencia</SubTitle1>}

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
            <div id="grid">
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
                          <StyledButton onClick={() => handleDeleteTicket(ticket.id)} disabled={event.tickets.length === 1}>Eliminar</StyledButton>
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
            </div>
          </MainContainer>
        ))
      ) : (
        <Lildiv><SubTitle>No tienes eventos registrados. </SubTitle></Lildiv>
      )}
          <Footer />
      </div>
  );
}
