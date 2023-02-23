import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { cities } from "../../utils/cities.js";

export default function EventEditor({ event, onCancel, onSave }) {
  const [name_event, setName_event] = useState(event.name_event);
  const [id_category, setId_category] = useState(event.id_category);
  const [description, setDescription] = useState(event.description);
  const [information, setInformation] = useState(event.information);
  const [photo_event, setPhoto_event] = useState(event.photo_event);
  const [video, setVideo] = useState(event.video);
  const [date_start, setDate_start] = useState(moment(event.date_start).format("YYYY-MM-DD"));
  const [start_time, setStart_time] = useState(event.start_time);
  const [date_end, setDate_end] = useState(moment(event.date_end).format("YYYY-MM-DD"));
  const [end_time, setEnd_time] = useState(event.end_time);
  const [visibility, setVisibility] = useState(event.visibility);
  const [restriction, setRestriction] = useState(event.restriction);
  const [city, setCity] = useState(event.city);
  const [address, setAddress] = useState(event.address);
  const [reference, setReference] = useState(event.reference);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/category").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name_event: name_event,
      id_category: id_category,
      description: description,
      information: information,
      photo_event: photo_event,
      video: video,
      date_start: moment(date_start).format("YYYY-MM-DD"),
      start_time: start_time,
      date_end: moment(date_end).format("YYYY-MM-DD"),
      end_time: end_time,
      visibility: visibility,
      restriction: restriction,
      city: city,
      address: address,
      reference: reference
    };

    onSave(data);
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <div>
      <h2>1.- Detalles del Evento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span><b>Imagen: </b></span>
          <input
            type="text"
            value={photo_event}
            onChange={(e) => setPhoto_event(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Nombre del Evento: </b></span>
          <input
            type="text" maxlength="99" placeholder="Dale un nombre corto y llamativo."
            value={name_event}
            onChange={(e) => setName_event(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Fecha de Inicio: </b></span>
          <input
            type="date"
            value={date_start}
            onChange={(e) => setDate_start(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Fecha Final: </b></span>
          <input
            type="date"
            value={date_end}
            onChange={(e) => setDate_end(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Hora de Inicio: </b></span>
          <input
            type="time"
            value={start_time}
            onChange={(e) => setStart_time(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Hora Final: </b></span>
          <input
            type="time"
            value={end_time}
            onChange={(e) => setEnd_time(e.target.value)} required
          />
        </label>
        <br />
        <label>
          <span><b>Categoría: </b></span>
	  <select value={id_category} onChange={(e) => setId_category(e.target.value)} required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          <span><b>Link de Video: </b></span>
          <input
            type="text" maxlength="254" placeholder="Copia el link de tu video youtube"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </label>
        <br />
        <label>
          <span><b>Restricción: </b></span>
          <input
            type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() }
            value={restriction}
            onChange={(e) => setRestriction(e.target.value)} required
          />
        </label>
	<br />
        <label>
          <span><b>Visibilidad: </b></span>
          <input
            type="checkbox"
            checked={visibility === "yes"}
            onChange={(e) => setVisibility(e.target.checked ? "yes" : "no")}
          /> Mostrar el evento públicamente
        </label>
	<br />
        <label>
          <span><b>Descripción: </b></span>
	  <br />
          <textarea name="description" maxlength="65535" rows="3"
	    placeholder="Escribe un párrafo corto pero potente que describa tu evento"
            value={description}
            onChange={(e) => setDescription(e.target.value)} required
          />
        </label>
	<br />
        <label>
          <span><b>Información Adicional: </b></span>
	  <br />
          <textarea name="information" maxlength="65535" rows="10"
	    placeholder="Dale a los usuarios más información: detalles del evento, panelistas, links relacionados, cronograma del evento, etc."
            value={information}
            onChange={(e) => setInformation(e.target.value)}
          />
        </label>
        <br />

        <h2>2.- Ubicación</h2>
        <label>
          <span><b>Ciudad: </b></span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)} required>
	    {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>
	<br />
        <label>
          <span><b>Dirección: </b></span>
          <input
            type="text" maxlength="50" placeholder="Escribe la dirección donde será el evento"
            value={address}
            onChange={(e) => setAddress(e.target.value)} required
          />
        </label>
	<br />
        <label>
          <span><b>Referencia: </b></span>
          <input
            type="text" maxlength="254" placeholder="Ej. A 3 cuadras de la librería pública"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
	<br />
	<br />
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
