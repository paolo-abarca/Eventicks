import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";


export default function BuyTickets(user) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [ticketList, setTicketList] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${eventId}`).then((response) => {
      const tickets = response.data.tickets.reduce((acc, ticket) => {
        acc[ticket.id] = 0;
        return acc;
      }, {});
      setTicketQuantities(tickets);
      setEvent(response.data);
    });
  }, [eventId]);

  useEffect(() => {
    let newTotal = 0;
    event?.tickets.forEach((ticket) => {
      newTotal += ticketQuantities[ticket.id] * ticket.price;
    });
    setTotal(newTotal);
  }, [ticketQuantities, event]);

  const formatDate = (date) => {
    const day = daysDict[moment(date).locale("en").format("dddd")];
    const month = monthsDict[moment(date).locale("en").format("MMMM")];
    return `${day}, ${moment(date).format("D")} de ${month} de ${moment(date).format("YYYY")}`;
  };

  const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("HH:mm A");
  }

  const handleIncrement = (ticketId) => {
    setTicketQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[ticketId] < event.tickets.find((ticket) => ticket.id === ticketId).amount_ticket) {
        newQuantities[ticketId]++;
      }
      return newQuantities;
    });
  };

  const handleDecrement = (ticketId) => {
    setTicketQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[ticketId] > 0) {
        newQuantities[ticketId]--;
      }
      return newQuantities;
    });
  };

  const handleBuyTickets = () => {
    const newTickets = Object.entries(ticketQuantities)
      .filter(([ticketId, amount]) => amount > 0)
      .map(([ticketId, amount]) => ({
        id_user: user.user.id,
        id_ticket: parseInt(ticketId),
        amount: amount,
      }));

    setTicketList([...ticketList, ...newTickets]);

    axios.post('http://localhost:5000/api/buy_tickets', newTickets)
      .then((response) => {
        console.log('Tickets comprados con éxito');
        axios.get(`http://localhost:5000/api/events/${eventId}`).then((response) => {
          const tickets = response.data.tickets.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
          }, {});
           setTicketQuantities(tickets);
           setEvent(response.data);
        });
        alert("Tickets comprados con éxito")
      })
      .catch((error) => {
        console.error('Error al comprar tickets:', error);
      });
  };

  return (
    <div>
      <h1>{event ? event.name_event : "Cargando evento..."}</h1>
      {event && (
        <>
          <p>{event.photo_event}</p>
          <p>Fecha: {formatDate(event.date_start)} - {formatDate(event.date_end)}</p>
          <p>Horario: {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
          <h3>Tickets</h3>
          <ul>
            {event.tickets.map((ticket) => (
              <li key={ticket.id}>
                <hr></hr>
                <p>{ticket.type}</p>
                <p>{ticket.currency} {ticket.price}</p>
                <p>{ticket.amount_ticket}</p>
                <div>
                  <button onClick={() => handleDecrement(ticket.id)}>-</button>
                  <span>{ticketQuantities[ticket.id]}</span>
                  <button onClick={() => handleIncrement(ticket.id)}>+</button>
                </div>
              </li>
            ))}
          </ul>
          <p>Para mayores de {event.restriction}</p>
          <p>Total: {event.currency}{total.toFixed(2)}</p>
          <button onClick={handleBuyTickets}>Comprar</button>
          <hr></hr>
          <h3>Lugar</h3>
          <p>{event.city}, PE</p>
          <p>{event.address}</p>
          <p>{event.reference}</p>
          <h3>Organiza</h3>
          <p>{event.name_user} {event.last_name}</p>
          <hr></hr>
          <p>{event.video}</p>
          <p>{event.description}</p>
          <p>{event.information}</p>
        </>
      )}
    </div>
  );
}
