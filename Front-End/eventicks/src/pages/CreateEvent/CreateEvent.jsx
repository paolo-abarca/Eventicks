import { useState, useEffect } from "react";
import axios from "axios";

const CreateEvent = ({ userId }) => {
  const [name_event, setName] = useState("");
  const [id_category, setId_category] = useState("");
  const [description, setDescription] = useState("");
  const [information, setInformation] = useState("");
  const [photo_event, ] = useState("");
  const [video, setVideo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [visibility, setVisibility] = useState("");
  const [restriction, setRestriction] = useState("");
  const [city, setCity] = useState("");
  const [addres, setAddres] = useState("");
  const [reference, setReference] = useState("");
 
  

  const [currency, setCurrency] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [tickets, setTickets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://172.24.2.112:5000/api/category")
      .then((response) => setCategories(response.data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  const handleFileInputChange = (event) => {
    photo_event(event.target.files[0]);
  };

  const handleAddTicket = () => {
    if (currency && ticketType && ticketPrice) {
      const newTicket = {
        id: tickets.length + 1,
        currency,
        type: ticketType,
        price: ticketPrice,
      };
      setTickets([...tickets, newTicket]);
      setCurrency("");
      setTicketType("");
      setTicketPrice("");
    }
  };

  const handleRemoveTicket = (id) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_event", name_event);
    formData.append("id_category", id_category);
    formData.append("description", description);
    formData.append("information", information);
    formData.append("photo_event", photo_event);
    formData.append("video", video);
    formData.append("date_start", startDate);
    formData.append("start_time", startTime);
    formData.append("date_end", endDate);
    formData.append("end_time", end_time);
    
    formData.append("visibility", visibility);
    formData.append("restriction", restriction);
    formData.append("city", city);
    formData.append("addres", addres);
    formData.append("reference", reference);

    formData.append("tickets", JSON.stringify(tickets));

    console.log({
      name_event,
      id_category,
      description,
      information,
      photo_event,
      video,
      startDate,
      startTime,
      endDate,
      end_time,
      visibility,
      restriction,
      city,
      addres,
      reference,
      tickets,
    });

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/5/events`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { currency, type, amount_ticket, price } = response.data;
      console.log(
        `Event created with ticket: ${currency}, ${type}, ${amount_ticket}, ${price}`
      );
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name_event">Name</label>
        <input
          type="text"
          id="name_event"
          value={name_event}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
    <label htmlFor="id_category">Category</label>
    <select
      id="id_category"
      value={id_category}
      onChange={(e) => setId_category(e.target.value)}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name_category}
        </option>
      ))}
    </select>
  </div>
  <div>
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="information">Information</label>
    <textarea
      id="information"
      value={information}
      onChange={(e) => setInformation(e.target.value)}
    />
  </div>
  
  /*<div>
    <label htmlFor="photo_event">Photo</label>
    <input type="file" id="photo_event" onChange={handleFileInputChange}
    onChange={(e) => setInformation(e.target.value)}
    />
  </div>*/


  <div>
    <label htmlFor="video">Video</label>
    <input
      type="text"
      id="video"
      value={video}
      onChange={(e) => setVideo(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="start-date">Start Date</label>
    <input
      type="date"
      id="start-date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="start-time">Start Time</label>
    <input
      type="time"
      id="start-time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="end-date">End Date</label>
    <input
      type="date"
      id="end-date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="end_time">End Time</label>
    <input
      type="time"
      id="end_time"
      value={end_time}
      onChange={(e) => setEnd_time(e.target.value)}
    />
  </div>
  


  <div>
<label htmlFor="visibility">Visibility</label>
<select
id="visibility"
value={visibility}
onChange={(e) => setVisibility(e.target.value)}
>
<option value="">Select visibility</option>
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</div>


<div>
    <label htmlFor="restriction">restriction</label>
    <input
      type="number"
      id="restriction"
      value={restriction}
      onChange={(e) => setRestriction(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="city">city</label>
    <input
      type="text"
      id="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="address">address: </label>
    <input
      type="text"
      id="address"
      value={city}
      onChange={(e) => setAddres(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="reference">Reference: </label>
    <input
      type="text"
      id="reference"
      value={city}
      onChange={(e) => setReference(e.target.value)}
    />
  </div>

  <div>
    <label htmlFor="currency">Currency</label>
    <input
      type="text"
      id="currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="ticket-type">Ticket Type</label>
    <input
      type="text"
      id="ticket-type"
      value={ticketType}
      onChange={(e) => setTicketType(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="ticket-price">Ticket Price</label>
    <input
      type="number"
      id="ticket-price"
      value={ticketPrice}
      onChange={(e) => setTicketPrice(e.target.value)}
    />
  </div>
  <div>
    <button type="button" onClick={handleAddTicket}>
      Add Ticket
    </button>
    <ul>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          {ticket.currency} - {ticket.type} - {ticket.price}{" "}
          <button
            type="button"
            onClick={() => handleRemoveTicket(ticket.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
  {errorMessage && <div>{errorMessage}</div>}
  <button type="submit">Create Event</button>
</form>
);
};

export default CreateEvent;



