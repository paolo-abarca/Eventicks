import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";

export default function Home(props) {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterValue1, setFilterValue1] = useState("");
  const [filterValue2, setFilterValue2] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  const formatDate = (date) => {
    const day = daysDict[moment(date).locale("en").format("dddd")];
    const month = monthsDict[moment(date).locale("en").format("MMMM")];
    return `${day}, ${moment(date).format("D")} de ${month} de ${moment(date).format("YYYY")}`;
  };

  const formatTime = (time) => {
    return moment(time, "HH:mm:ss").format("HH:mm A");
  }

  const handleFilterType = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValue1 = (event) => {
    setFilterValue1(event.target.value);
  };

  const handleFilterValue2 = (event) => {
    setFilterValue2(event.target.value);
  };

  const handleFilterSubmit = () => {
    let data = {};
    if (filterType === "price") {
      data = {
        price_min: filterValue1,
        price_max: filterValue2
      };
    } else if (filterType === "category") {
      data = {
        category_id: filterValue1
      };
    } else if (filterType === "city") {
      data = {
        city_name: filterValue1
      };
    } else if (filterType === "date") {
      data = {
        date_min: filterValue1,
        date_max: filterValue2
      };
    }
    axios.post("http://localhost:5000/api/events/filters", data)
      .then((response) => {
        setEvents(response.data);
      });
  };

  const handleClearFilter = () => {
    setFilterType("");
    setFilterValue1("");
    setFilterValue2("");
    axios.get("http://localhost:5000/api/events").then((response) => {
      setEvents(response.data);
    });
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <div>
      <h1>Bienvenido a Eventicks</h1>
      <h3>Esta es la página principal de nuestra aplicación.</h3>
      <div>
        <button value="price" onClick={handleFilterType}>Precio</button>
        <button value="category" onClick={handleFilterType}>Categoría</button>
        <button value="city" onClick={handleFilterType}>Ciudad</button>
        <button value="date" onClick={handleFilterType}>Fecha</button>
      </div>
      {filterType === "price" && (
        <div>
          <input type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } value={filterValue1} onChange={handleFilterValue1} />
          <input type="number" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } value={filterValue2} onChange={handleFilterValue2} />
          <button onClick={handleFilterSubmit}>Filtrar</button>
          <button onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "category" && (
        <div>
          <input type="text" value={filterValue1} onChange={handleFilterValue1} />
          <button onClick={handleFilterSubmit}>Filtrar</button>
          <button onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "city" && (
        <div>
          <input type="text" value={filterValue1} onChange={handleFilterValue1} />
          <button onClick={handleFilterSubmit}>Filtrar</button>
          <button onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "date" && (
        <div>
          <input type="date" value={filterValue1} onChange={handleFilterValue1} />
          <input type="date" value={filterValue2} onChange={handleFilterValue2} />
          <button onClick={handleFilterSubmit}>Filtrar</button>
          <button onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      <h2>Eventos Disponibles</h2>
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id}>
            <hr></hr>
            <p>{event.photo_event}</p>
            <h3>{event.name_event}</h3>
            <p><b>Fecha:</b> {formatDate(event.date_start)} - {formatDate(event.date_end)}</p>
            <p><b>Horario:</b> {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p><b>Precio:</b> {event.currency}{event.price}</p>
            {props.isAuthenticated ? (
              <Link to={`/comprar-tickets/${event.id}`}>
                <button>Comprar</button>
              </Link>
            ) : (
              <Link to="/login">
                <button>Comprar</button>
              </Link>
            )}
        </div>
        ))
      ) : events.length === 0 ? (
        <p>Cargando eventos...</p>
      ) : (
        <p>No hay eventos</p>
      )}
    </div>
  );
}
