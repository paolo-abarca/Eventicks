import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";


export default function MyEvents({ user }) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${user.id}/my_events`).then((response) => {
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
  }

  return (
    <div>
      <h1>Mis Eventos</h1>
      {loading ? (
        <p>Cargando Eventos...</p>
      ) : events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <hr></hr>
            <hr></hr>
            <p>{event.photo_event}</p>
            <p>{event.name_event}</p>
            <p>Fecha: {formatDate(event.date_start)} - {formatDate(event.date_end)}</p>
            <p>Horario: {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p>Para mayores de {event.restriction}</p>
            <hr></hr>
            <h3>Lugar</h3>
            <p>{event.city}, PE</p>
            <p>{event.address}</p>
            <p>{event.reference}</p>
            <hr></hr>
            <p>{event.video}</p>
            <p>{event.description}</p>
            <p>{event.information}</p>
            <p>{event.name_category}</p>
            <h3>Entradas</h3>
            <ul>
              {event.tickets.map((ticket) => (
                <li key={ticket.id}>
                  <hr></hr>
                  <p>{ticket.type}</p>
                  <p>{ticket.currency}{ticket.price}</p>
                  <p>{ticket.amount_ticket}</p>
                </li>
              ))}
            </ul>
          </div>
	))
      ) : (
        <p>No hay eventos</p>
      )}
    </div>
  );
}
