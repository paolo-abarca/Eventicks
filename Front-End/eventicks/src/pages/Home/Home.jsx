import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import { categories } from "../../utils/categories.js";
import { cities } from "../../utils/cities.js";

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

  const photos = [
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676999784/eventicks/NGN1qsT3skHtqKt_kfmxry.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/QvsUiqfh3SxhfTY_nzomdk.png",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/HaiMT3Qa3L5U26j_mxwjtk.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/VLreJXGN5WWAAkn_xvll3c.png",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/rE9F3vyBq8o3g4z_kky8ba.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/2BgFx4SF2oy3LYE_dvhnzl.jpg"
  ];

  const banner = document.getElementById('banner');

  if (banner) {
    let currentPhotoIndex = 0; // Índice de la foto actual

    // Función para mostrar la foto actual y ocultar las demás
    const showCurrentPhoto = () => {
      const photoUrl = photos[currentPhotoIndex];

      // Eliminamos los elementos `div` que no son la foto actual
      const otherPhotos = Array.from(banner.querySelectorAll('.banner-photo')).filter((photo, index) => index !== currentPhotoIndex);
        otherPhotos.forEach(photo => photo.remove());

      // Creamos un nuevo `div` para la foto actual si no existe ya
      let currentPhotoDiv = banner.querySelector('.banner-photo-current');
      if (!currentPhotoDiv) {
        currentPhotoDiv = document.createElement('div');
        currentPhotoDiv.classList.add('banner-photo', 'banner-photo-current');
        banner.appendChild(currentPhotoDiv);
      }

      // Mostramos la foto actual
      currentPhotoDiv.style.backgroundImage = `url('${photoUrl}')`;
    };

    // Mostramos la primera foto al cargar la página
    showCurrentPhoto();

    // Función para avanzar a la siguiente foto
    const nextPhoto = () => {
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      showCurrentPhoto();
    };

    // Avanzamos a la siguiente foto cada 7 segundos
    setInterval(nextPhoto, 7000);
  }

  return (
    <div>
          <div id="banner">
    </div>
      <div  className="button-container">
        <button className="category-btn" value="price" onClick={handleFilterType}>Precio</button>
        <button className="category-btn" value="category" onClick={handleFilterType}>Categoría</button>
        <button className="category-btn" value="city" onClick={handleFilterType}>Ciudad</button>
        <button className="category-btn" value="date" onClick={handleFilterType}>Fecha</button>
      </div>
      {filterType === "price" && (
        <div >
          <input className="delete-button" type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } step="0.01" value={filterValue1} onChange={handleFilterValue1} required/>
          <input className="delete-button" type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } step="0.01" value={filterValue2} onChange={handleFilterValue2} required/>
          <button className="delete-button" onClick={handleFilterSubmit}>Filtrar</button>
          <button className="delete-button" onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "category" && (
        <div>
          <select className="delete-button" value={filterValue1} onChange={handleFilterValue1}>
            {categories.map((category) => (
              <option key={category.id} value={category.id} required>
                {category.name_category}
              </option>
            ))}
          </select>
          <button className="delete-button" onClick={handleFilterSubmit}>Filtrar</button>
          <button className="button-container" onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "city" && (
        <div>
          <select className="delete-button" value={filterValue1} onChange={handleFilterValue1} required>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <button className="button-container" onClick={handleFilterSubmit}>Filtrar</button>
          <button className="button-container" onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      {filterType === "date" && (
        <div>
          <input  className="delete-button" type="date" value={filterValue1} onChange={handleFilterValue1} required/>
          <input  className="delete-button" type="date" value={filterValue2} onChange={handleFilterValue2} required/>
          <button onClick={handleFilterSubmit}>Filtrar</button>
          <button onClick={handleClearFilter}>Eliminar filtro</button>
        </div>
      )}
      <div>
      <h2  className="h2">Eventos</h2>
      </div>
      <div className="allcard">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} >
          <div className="card">
 
            <div className="event-card">
            <div className="imagenCloud" style={{ backgroundImage: `url(${event.photo_event})` }}>
            </div>
            <h3>{event.name_event}</h3>
            <p><b>Fecha:</b> {formatDate(event.date_start)} - {formatDate(event.date_end)}</p>
            <p><b>Horario:</b> {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
            <p><b>Precio:</b> {event.currency} {event.price}</p>
            {props.isAuthenticated ? (
              <Link to={`/comprar-tickets/${event.id}`}>
                <button className="buy-button">Comprar</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="buy-button">Comprar</button>
              </Link>
            )}
        </div>
            </div>
            </div>
            
        ))
      ) : events.length === 0 ? (
        <p>No hay eventos</p>
      ) : (
        <p>No hay eventos</p>
      )}
    </div>
    </div>
    

  );
}
