import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";

export default function MyTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${user.id}/my_tickets`).then((response) => {
      setTickets(response.data);
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
      <h1>Mis Tickets</h1>
      {loading ? (
        <p>Cargando Tickets...</p>
      ) : tickets.length > 0 ? (
        tickets.map((ticket) => (
          <div key={ticket.nanme_event}>
            <hr></hr>
            <p>{ticket.photo_event}</p>
            <h4>{ticket.name_event}</h4>
            <p>{formatDate(ticket.date_start)} - {formatDate(ticket.date_end)}</p>
            <p>{formatTime(ticket.start_time)} - {formatTime(ticket.end_time)}</p>
            <p>{ticket.city}, PE</p>
            <p>{ticket.address}</p>
            <p>Entrada: {ticket.type}</p>
            <p>Para {ticket.amount} personas</p>
            <p>Mayores de {ticket.restriction}</p>
            <p>{ticket.name_user} {ticket.last_name}</p>
            <p>{ticket.document_type}: {ticket.number_document}</p>
            <Link to={`/comprar-tickets/${ticket.id}`}>
              <button>Ver evento</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No hay tickets</p>
      )}
    </div>
  );
}
