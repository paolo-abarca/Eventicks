import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../index.css"
import moment from "moment";
import { daysDict, monthsDict } from "../../utils/translations.js";
import { categories } from "../../utils/categories.js";
import { cities } from "../../utils/cities.js";
import { Title, StyledButton, StyledSelect, FilterContainer, StyledInput, Lildiv, SubTitle} from './someStyle.js';
import Footer from '../Footer/Footer';
import CookieNotice from '../Cookies/Cookies';

export default function Home(props) {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterValue1, setFilterValue1] = useState("");
  const [filterValue2, setFilterValue2] = useState("");
  const [loading, setLoading] = useState(true);
  const [nothing, setNothing] = useState(null);

  useEffect(() => {
    if (true) {
      setNothing(true);
    }
  }, [nothing]);

  useEffect(() => {
    if (nothing) {
      const fetchEvents = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/events");
          setEvents(res.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchEvents();
    }
  }, [nothing]);

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

  const validateFilter = () => {
    if (filterValue1 === '') {
      alert('Por favor, selecciona una opción antes de aplicar el filtro.');
      return false;
    }
    return true;
  };

  const validateFilter2 = () => {
    if (filterValue1 === '' || filterValue2 === '') {
      alert('Por favor, ingrese un valor antes de aplicar el filtro.');
      return false;
    }
    return true;
  };

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  const photos = [
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676999784/eventicks/NGN1qsT3skHtqKt_kfmxry.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/QvsUiqfh3SxhfTY_nzomdk.png",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/HaiMT3Qa3L5U26j_mxwjtk.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1676996528/eventicks/VLreJXGN5WWAAkn_xvll3c.png",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1678728918/eventicks/jozaj8g6d0srrdtofx6w.jpg",
    "https://res.cloudinary.com/cloud-eventicks/image/upload/v1678733686/eventicks/dtw7usp0yupbihr6yuqr.png"
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
        <FilterContainer>
          <StyledInput className="delete-button" type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } step="0.01" value={filterValue1} onChange={handleFilterValue1} required/>
          <StyledInput className="delete-button" type="number" min="0" placeholder="0.00" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() } step="0.01" value={filterValue2} onChange={handleFilterValue2} required/>
          <StyledButton className="delete-button" onClick={() => validateFilter2() && handleFilterSubmit()}>Filtrar</StyledButton>
          <StyledButton className="delete-button" onClick={handleClearFilter}>Eliminar filtro</StyledButton>
        </FilterContainer>
      )}
      {filterType === "category" && (
        <FilterContainer>
          <StyledSelect className="delete-button" value={filterValue1} onChange={handleFilterValue1} required>
            <option value="">Elige una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_category}
              </option>
            ))}
          </StyledSelect>
          <StyledButton className="delete-button" onClick={() => validateFilter() && handleFilterSubmit()}>Filtrar</StyledButton>
          <StyledButton className="button-container" onClick={handleClearFilter}>Eliminar filtro</StyledButton>
        </FilterContainer>
      )}
      {filterType === "city" && (
        <FilterContainer>
          <StyledSelect className="delete-button" value={filterValue1} onChange={handleFilterValue1} required>
	    <option value="">Selecciona una Ciudad</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </StyledSelect>
          <StyledButton className="button-container" onClick={() => validateFilter() && handleFilterSubmit()}>Filtrar</StyledButton>
          <StyledButton className="button-container" onClick={handleClearFilter}>Eliminar filtro</StyledButton>
        </FilterContainer>
      )}
      {filterType === "date" && (
        <FilterContainer>
          <StyledInput className="delete-button" type="date" value={filterValue1} onChange={handleFilterValue1} required/>
          <StyledInput  className="delete-button" type="date" value={filterValue2} onChange={handleFilterValue2} required/>
          <StyledButton onClick={() => validateFilter2() && handleFilterSubmit()}>Filtrar</StyledButton>
          <StyledButton onClick={handleClearFilter}>Eliminar filtro</StyledButton>
        </FilterContainer>
      )}
      <div>
      <Title>Eventos</Title>
      </div>
      <div className="allcard">
        {loading ? (
            <Lildiv><SubTitle>Cargando Eventos...</SubTitle></Lildiv>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} >
              <div className="card">
                <div className="event-card">
                  <div className="imagenCloud" style={{ backgroundImage: `url(${event.photo_event})` }}>
                </div>
                <h3 className="title">{event.name_event}</h3>
                <p className="date">{formatDate(event.date_start)} - {formatDate(event.date_end)}</p>
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
  ) : (
    <Lildiv><SubTitle>No hay eventos</SubTitle></Lildiv>
  )}
</div>
<CookieNotice />
  <Footer />

</div>
  );
}
