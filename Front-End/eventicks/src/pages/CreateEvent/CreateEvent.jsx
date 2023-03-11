import { useState, useEffect } from 'react';
import axios from "axios";
import { cities } from "../../utils/cities.js";
import { Title, SubTitle, StyledButton, 
  StyledSelect, StyledInput, StyledTextArea, 
  StyledInput1, MainContainer, FirstContainer, 
  SecondContainer, ThirdContainer, FourthContainer,
  TitleContainer, BeautyContainer, Number, 
  FinalButton, SubTitle1, SubTitle2} from './someStyle.js';

function CreateEvent({ user }) {
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [eventData, setEventData] = useState({
    name_event: '',
    id_category: '',
    description: '',
    information: '',
    photo_event: '',
    video: '',
    date_start: '',
    start_time: '',
    date_end: '',
    end_time: '',
    visibility: '',
    restriction: 0,
    city: '',
    address: '',
    reference: '',
    tickets: [
      {
        currency: '',
        type: '',
        amount_ticket: 0,
        price: 0.00
      }
    ]
  });

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('token');
          // eslint-disable-next-line
          const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("OK")
        } catch (err) {
          console.error(err);
          if (err.response && err.response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            localStorage.removeItem("user");
            window.location.href = '/login';
          }
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset-eventicks');
    
    axios.post('https://api.cloudinary.com/v1_1/cloud-eventicks/image/upload', formData)
      .then(response => {
        console.log(response.data.secure_url);
        setEventData({ ...eventData, photo_event: response.data.secure_url });
      })
      .catch(error => {
        console.error('Error al subir la foto:', error);
      });
  };


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category")
      .then((response) => setCategories(response.data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = `http://localhost:5000/api/users/${user.id}/events`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    };
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert('Debe volver a iniciar sesión');
            localStorage.removeItem('token');
            localStorage.removeItem("user");
            window.location.href = '/login';
          } else {
            throw Error('Error en la solicitud');
          }
        } else {
          alert("El evento ha sido creado exitosamente!");
          window.location.href = '/mis-eventos';
          return response.data;
	}
      })
      .catch(error => {
        console.error('Error al crear el evento:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleTicketChange = (index, event) => {
    const { name, value } = event.target;
    const tickets = [...eventData.tickets];
    tickets[index] = { ...tickets[index], [name]: value };
    setEventData({ ...eventData, tickets });
  };

  const handleAddTicket = () => {
    setEventData({ ...eventData, tickets: [...eventData.tickets, { currency: '', type: '', amount_ticket: 0, price: 0.00 }] });
  };

  const handleRemoveTicket = (index) => {
    if (eventData.tickets.length === 1) {
      return; // no hagas nada si solo hay un formulario
    }
    const tickets = [...eventData.tickets];
    tickets.splice(index, 1);
    setEventData({ ...eventData, tickets });
  };

  const exceptThisSymbols2 = ["e", "E", "+", "-"];
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (

    <form onSubmit={handleSubmit}>
      <MainContainer>
      <FirstContainer>
        <TitleContainer>
        <Number>1</Number><Title> Detalles del Evento</Title>
        </TitleContainer>
      <label>
        <SubTitle>Nombre del Evento*</SubTitle>
        <StyledInput type="text" name="name_event" maxlength="99" placeholder="Dale un nombre corto y llamativo." value={eventData.name_event} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <SubTitle>Elige una Categoría*</SubTitle>
        <StyledSelect name="id_category" value={eventData.id_category} onChange={handleInputChange} required>
          <option value="">Elige una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name_category}
            </option>
          ))}
        </StyledSelect>
      </label>
      <br />
      <label>
        <SubTitle>Descripción del Evento*</SubTitle>
        <StyledTextArea name="description" maxlength="65535" rows="3" placeholder="Escribe un párrafo corto pero potente que describa tu evento" value={eventData.description} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <SubTitle>Información Adicional</SubTitle>
        <StyledTextArea name="information" maxlength="65535" rows="10" placeholder="Dale a los usuarios más información: detalles del evento, panelistas, links relacionados, cronograma del evento, etc." value={eventData.information} onChange={handleInputChange} />
      </label>
      <label>
        <SubTitle>Fecha de Inicio del evento*</SubTitle>
        <StyledInput1 type="date" name="date_start" value={eventData.date_start} onChange={handleInputChange} required />
      </label>
      <label>
        <SubTitle>Hora de Inicio*</SubTitle>
        <StyledInput1 type="time" name="start_time" value={eventData.start_time} onChange={handleInputChange} required />
      </label>
      <label>
        <SubTitle>El evento finaliza*</SubTitle>
        <StyledInput1 type="date" name="date_end" value={eventData.date_end} onChange={handleInputChange} required />
      </label>
      <label>
        <SubTitle>Hora Final*</SubTitle>
        <StyledInput1 type="time" name="end_time" value={eventData.end_time} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <SubTitle>Visibilidad*</SubTitle>
        <input type="checkbox" name="visibility" checked={eventData.visibility === 'yes'} onChange={(e) => setEventData({...eventData, visibility: e.target.checked ? 'yes' : 'no' })} />
        <SubTitle1>Mostrar el evento públicamente</SubTitle1>
      </label>
      <br />
      <label>
        <SubTitle>Restricción*</SubTitle>
        <StyledInput1 type="number" name="restriction" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } value={eventData.restriction} onChange={handleInputChange} required />
        <SubTitle1>Es la edad minima para ingresar</SubTitle1>
      </label>
      </FirstContainer>
      <SecondContainer>
      <label>
  <SubTitle>Imagen* (846px x 522px)</SubTitle>
  <input type="file" name="photo_event" onChange={handleFileInputChange} required />
  {eventData["photo_event"] !== "" ?
  <p><img src={eventData["photo_event"]} alt="Imagen de Evento" width="500px" /></p> :
  <SubTitle2>Selecciona una foto</SubTitle2>}
    </label>
      <label>
        <SubTitle>Video</SubTitle>
        <StyledInput type="text" name="video" maxlength="254" placeholder="Copia el link de tu video youtube" value={eventData.video} onChange={handleInputChange} />
      </label>
      </SecondContainer>
      <br />
        <ThirdContainer>
      <TitleContainer>
      <Number>2</Number><Title>Ubicación</Title>
      </TitleContainer>
      <label>
        <SubTitle>Ciudad*</SubTitle>
        <StyledSelect name="city" value={eventData.city} onChange={handleInputChange} required>
          <option value="">Seleccionar ciudad</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </StyledSelect>
      </label>
      <br />
      <label>
        <SubTitle>Dirección*</SubTitle>
        <StyledInput type="text" name="address" maxlength="50" placeholder="Escribe la dirección donde será el evento" value={eventData.address} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <SubTitle>Referencia</SubTitle>
        <StyledInput type="text" name="reference" maxlength="254" placeholder="Ej. A 3 cuadras de la librería pública" value={eventData.reference} onChange={handleInputChange} />
      </label>
        </ThirdContainer>
      <br />
          <FourthContainer>
          <TitleContainer>
          <Number>3</Number><Title>Crear Tickets</Title>
          </TitleContainer>
          {eventData.tickets.map((ticket, index) => (
       <div key={index}>
          <label>
           <SubTitle>Tipo de moneda*</SubTitle>
           <br />
           <StyledSelect name="currency" value={ticket.currency} onChange={(event) => handleTicketChange(index, event)} required >
             <option value="">Selecciona el tipo de Moneda</option>
             <option value="S/">Soles</option>
             <option value="$">Dolares</option>
             <option value="€">Euros</option>
           </StyledSelect>
         </label>
         <br />
         <label>
           <SubTitle>Nombre del Ticket*</SubTitle>
           <StyledInput type="text" name="type" maxlength="20" placeholder="Ej. Gratis, VIP, Preventa"value={ticket.type} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <br />
         <label>
           <SubTitle>Cantidad Disponible*</SubTitle>
           <StyledInput1 type="number" min="0" placeholder="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } name="amount_ticket" value={ticket.amount_ticket} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <label>
           <SubTitle>Precio*</SubTitle>
           <StyledInput1 type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols2.includes(e.key) && e.preventDefault() } step="0.01" name="price" value={ticket.price} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <br />
         <StyledButton type="button" onClick={() => handleRemoveTicket(index)}>Eliminar Ticket</StyledButton>
         <StyledButton type="button" onClick={handleAddTicket}>+ Agregar Ticket</StyledButton>
       </div>
     ))}
          </FourthContainer>
        </MainContainer>
        <BeautyContainer>
        <FinalButton type="submit">Publicar Evento</FinalButton>
        </BeautyContainer>
    </form>
  );
}

export default CreateEvent;
