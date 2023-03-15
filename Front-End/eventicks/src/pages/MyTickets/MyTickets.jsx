import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import { Title, SubTitle, StyledButton,
  MainContainer, TitleContainer,
  Img, SubTitle1, Lildiv, SubTitle3} from './someStyle.js';
  import Footer from '../Footer/Footer';
  import "./Tickets.css"

export default function MyTickets({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Establecemos el valor inicial de userId como null

  useEffect(() => {
    if (user) { // Comprobamos que user tenga un valor
      setUserId(user.id);
    }
  }, [user]); // Actualizamos el valor de userId cuando user cambie

  useEffect(() => {
    if (userId) { // Comprobamos que userId tenga un valor
      const fetchTickets = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`http://localhost:5000/api/users/${userId}/my_tickets`, {
            headers: { Authorization: `Bearer ${token}` },
	  });
          setTickets(res.data);
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

      fetchTickets();
    }
  }, [userId]); // Aquí agregamos userId como dependencia

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
      <TitleContainer>
      <Title> Mis Tickets</Title>
      </TitleContainer>
      {loading ? (
        <Lildiv> 
          <SubTitle>Cargando Tickets...</SubTitle> 
        </Lildiv>
      ) : tickets.length > 0 ? (
        tickets.map((ticket) => (
          <MainContainer key={ticket.nanme_event}>
            <p><Img src={ticket.photo_event} alt="Imagen de evento" width="1100px"/></p>
            <SubTitle>{ticket.name_event}</SubTitle>
            <div className="a">
            <div>
            <SubTitle3>Fecha</SubTitle3>
            <SubTitle1>{formatDate(ticket.date_start)} - {formatDate(ticket.date_end)}</SubTitle1>
            </div>
            <div>
            <SubTitle3>Horario</SubTitle3>
            <SubTitle1>{formatTime(ticket.start_time)} - {formatTime(ticket.end_time)}</SubTitle1>
            </div>
            <div>
            <SubTitle3>Ciudad</SubTitle3>
            <SubTitle1>{ticket.city}, PE</SubTitle1>
            </div>
            <div>
            <SubTitle3>Dirección</SubTitle3>
            <SubTitle1>{ticket.address}</SubTitle1>
            </div>
            <div>
            <SubTitle3>Entrada: {ticket.type}</SubTitle3>
            <SubTitle1>Para {ticket.amount} personas</SubTitle1>
            </div>
            <div>
            <SubTitle3>Restricción</SubTitle3>
            <SubTitle1>Mayores de {ticket.restriction}</SubTitle1>
            </div>
            <div>
            <SubTitle3>Cliente</SubTitle3>
            <SubTitle1>{ticket.name_user} {ticket.last_name}</SubTitle1>
            </div>
            <div>
            <SubTitle3>Identificación</SubTitle3>
            {ticket.document_type ?
            <SubTitle1>{ticket.document_type} - {ticket.number_document}</SubTitle1>  :
            <SubTitle1>Sin Documentos</SubTitle1>}
            </div>
            </div>
            <Link to={`/comprar-tickets/${ticket.id}`}>
              <StyledButton>Ver evento</StyledButton>
            </Link>
          </MainContainer>
        ))
      ) : (
        <Lildiv><SubTitle>No hay tickets</SubTitle></Lildiv>
      )}
      <Footer />
    </div>
  );
}
