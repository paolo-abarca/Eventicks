import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import ReactPlayer from 'react-player';
import {VideoDiv, Title, SubTitle1,SubTitle3, SubTitle, Img, DivImage, StyledButton1, SubTitle4, StyledButton2} from './someStyle.js';
import "./BuyTickets.css";

export default function BuyTickets({ user }) {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [ticketList, setTicketList] = useState([]);
  const [total, setTotal] = useState(0);
  const [nothing, setNothing] = useState(null);

  useEffect(() => {
    if (true) {
      setNothing(true);
    }
  }, [nothing]);

  useEffect(() => {
    if (nothing) {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
	  });
          const tickets = res.data.tickets.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
          }, {});
          setTicketQuantities(tickets);
          setEvent(res.data);
	} catch (err) {
          console.error(err);
          if (err.response && err.response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
	}
      };
      fetchEvent();
    };
  // eslint-disable-next-line
  }, [nothing]);

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
        id_user: user.id,
        id_ticket: parseInt(ticketId),
        amount: amount,
      }));

    setTicketList([...ticketList, ...newTickets]);

    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/buy_tickets', newTickets, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Tickets comprados con éxito');
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/api/events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
	}).then((response) => {
          const tickets = response.data.tickets.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
          }, {});
           setTicketQuantities(tickets);
           setEvent(response.data);
        }).catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        });
        alert("Tickets comprados con éxito")
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Debe volver a iniciar sesión');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        console.error('Error al comprar tickets:', error);
      });
  };

  return (
    <div>
      <Title>{event ? event.name_event : "Cargando evento..."}</Title>
      {event && (
        <>
          <DivImage><Img src={event.photo_event} alt="Imagen de evento" /></DivImage>
          <div class="parent">
          <div class="div1">
          <SubTitle>Detalles del evento:</SubTitle>
          <SubTitle>Fecha </SubTitle><SubTitle1>{formatDate(event.date_start)} - {formatDate(event.date_end)}</SubTitle1>
          <SubTitle>Horario </SubTitle><SubTitle1>{formatTime(event.start_time)} - {formatTime(event.end_time)}</SubTitle1>
          <SubTitle>Descripción</SubTitle>
          <SubTitle1 >{event.description}</SubTitle1 >
          <SubTitle>Información adicional</SubTitle>
          <SubTitle1 >{event.information}</SubTitle1>
          <SubTitle1 >Para mayores de {event.restriction}</SubTitle1>
  
          <VideoDiv className='video'>
          <ReactPlayer
          url= {event.video}
          controls
          volume= '0.5'
          loop
         className='react-player'
          />
          </VideoDiv>
          </div>
          <div class="div2">
          <SubTitle >Tickets</SubTitle >
            {event.tickets.map((ticket) => (
              <div key={ticket.id} className="Ticket0">
                <div className="Ticket1"> 
                <SubTitle4>{ticket.type}</SubTitle4>
                </div>
                <div className="Ticket2">
                <SubTitle4>{ticket.currency} {ticket.price}</SubTitle4>
                </div>
                <div className="Ticket3">
                  <StyledButton1 onClick={() => handleDecrement(ticket.id)}>-</StyledButton1>
                  <SubTitle3>{ticketQuantities[ticket.id]}</SubTitle3>
                  <StyledButton1 onClick={() => handleIncrement(ticket.id)}>+</StyledButton1>
                </div>
              </div>
            ))}
            <div className="minigrid">
            <div className="mini1">
            <SubTitle1 ><b>Total: </b> {event.currency}{total.toFixed(2)}</SubTitle1 >
            </div>
            <div className="mini4">
            <StyledButton2 onClick={handleBuyTickets}>Comprar</StyledButton2>
            </div>
            </div>
          </div>
          <div class="div3">
          <SubTitle >Organiza</SubTitle>
          <SubTitle1 >{event.name_user} {event.last_name}</SubTitle1>
          <SubTitle >Lugar</SubTitle >
          <SubTitle1 >{event.city}, PE</SubTitle1 >
          <SubTitle1 >{event.address}</SubTitle1 >
          <SubTitle1 >{event.reference}</SubTitle1 >
          </div>
          </div>
        </>
      )}
    </div>
  );
}
