import { useState, useEffect } from 'react';
import axios from "axios";
import { cities } from "../../utils/cities.js";

function CreateEvent({ user }) {
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState("");
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
    const url = `http://localhost:5000/api/users/${user.id}/events`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    };
    fetch(url, requestOptions)
      .then(response => response.data)
      .then(data => {
         alert("El evento ha sido creado exitosamente!");
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
    const tickets = [...eventData.tickets];
    tickets.splice(index, 1);
    setEventData({ ...eventData, tickets });
  };

  const exceptThisSymbols2 = ["e", "E", "+", "-"];
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (

    <form onSubmit={handleSubmit}>
      <h2>1.- Detalles del Evento</h2>
      <label>
        <span><strong>Nombre del Evento*</strong></span>
        <br />
        <input type="text" name="name_event" maxlength="99" placeholder="Dale un nombre corto y llamativo." value={eventData.name_event} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Elige una Categoría*</strong></span>
        <br />
        <select name="id_category" value={eventData.id_category} onChange={handleInputChange} required>
          <option value="">Elige una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name_category}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        <span><strong>Descripción del Evento*</strong></span>
        <br />
        <textarea name="description" maxlength="65535" rows="3" placeholder="Escribe un párrafo corto pero potente que describa tu evento" value={eventData.description} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Información Adicional</strong></span>
        <br />
        <textarea name="information" maxlength="65535" rows="10" placeholder="Dale a los usuarios más información: detalles del evento, panelistas, links relacionados, cronograma del evento, etc." value={eventData.information} onChange={handleInputChange} />
      </label>
      
      <br />

      <label>
  <span><strong>Imagen* (846px x 522px)</strong></span>
  <br />
  <input type="file" name="photo_event" onChange={handleFileInputChange} required />
</label>

      <br />

      <label>
        <span><strong>Video</strong></span>
        <br />
        <input type="text" name="video" maxlength="254" placeholder="Copia el link de tu video youtube" value={eventData.video} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        <span><strong>Fecha de Inicio del evento*</strong></span>
        <br />
        <input type="date" name="date_start" value={eventData.date_start} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Hora de Inicio*</strong></span>
        <br />
        <input type="time" name="start_time" value={eventData.start_time} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>El evento finaliza*</strong></span>
        <br />
        <input type="date" name="date_end" value={eventData.date_end} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Hora Final*</strong></span>
        <br />
        <input type="time" name="end_time" value={eventData.end_time} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Visibilidad*</strong></span>
        <br />
        <input type="checkbox" name="visibility" checked={eventData.visibility === 'yes'} onChange={(e) => setEventData({...eventData, visibility: e.target.checked ? 'yes' : 'no' })} />
        Mostrar el evento públicamente
      </label>
      <br />
      <label>
        <span><strong>Restricción*</strong></span>
        <br />
        <input type="number" name="restriction" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } value={eventData.restriction} onChange={handleInputChange} required />
        Es la edad minima para ingresar
      </label>
      <br />
      <h2>2.- Ubicación</h2>
      <label>
        <span><strong>Ciudad*</strong></span>
        <br />
        <select name="city" value={eventData.city} onChange={handleInputChange} required>
          <option value="">Seleccionar ciudad</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </label>
      <br />
      <label>
        <span><strong>Dirección*</strong></span>
        <br />
        <input type="text" name="address" maxlength="50" placeholder="Escribe la dirección donde será el evento" value={eventData.address} onChange={handleInputChange} required />
      </label>
      <br />
      <label>
        <span><strong>Referencia</strong></span>
        <br />
        <input type="text" name="reference" maxlength="254" placeholder="Ej. A 3 cuadras de la librería pública" value={eventData.reference} onChange={handleInputChange} />
      </label>
      <br />
      <h2>3.- Crear Tickets</h2>
     {eventData.tickets.map((ticket, index) => (
       <div key={index}>
         <label>
           <span><strong>Tipo de moneda*</strong></span>
           <br />
           <select name="currency" value={ticket.currency} onChange={(event) => handleTicketChange(index, event)} required >
             <option value="">Selecciona el tipo de Moneda</option>
             <option value="S/">Soles</option>
             <option value="$">Dolares</option>
             <option value="€">Euros</option>
           </select>
         </label>
         <br />
         <label>
           <span><strong>Nombre del Ticket*</strong></span>
           <br />
           <input type="text" name="type" maxlength="20" placeholder="Ej. Gratis, VIP, Preventa"value={ticket.type} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <br />
         <label>
           <span><strong>Cantidad Disponible*</strong></span>
           <br />
           <input type="number" min="0" placeholder="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } name="amount_ticket" value={ticket.amount_ticket} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <br />
         <label>
           <span><strong>Precio*</strong></span>
           <br />
           <input type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols2.includes(e.key) && e.preventDefault() } step="0.01" name="price" value={ticket.price} onChange={(event) => handleTicketChange(index, event)} required />
         </label>
         <br />
         <button type="button" onClick={() => handleRemoveTicket(index)}>Eliminar Ticket</button>
       </div>
     ))}
     <button type="button" onClick={handleAddTicket}>+ Agregar Ticket</button>
     <br />
     <br />
     <button type="submit">Publicar Evento</button>
    </form>
  );
}

export default CreateEvent;
