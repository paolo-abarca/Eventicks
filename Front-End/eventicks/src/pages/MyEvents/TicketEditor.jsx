import React, { useState } from "react";

export default function TicketEditor({ ticket, onCancel, onSave }) {
  const [currency, setCurrency] = useState(ticket.currency);
  const [type, setType] = useState(ticket.type);
  const [amount_ticket, setAmount_ticket] = useState(ticket.amount_ticket)
  const [price, setPrice] = useState(ticket.price);

  const handleSave = (event) => {
  event.preventDefault();

  // Verificar que todos los campos requeridos tengan un valor
  if (!currency || !type || !amount_ticket || !price) {
    alert('Por favor completa todos los campos requeridos.');
    return;
  }

  const data = {
    currency,
    type,
    amount_ticket,
    price
  };

  onSave(data);
};

  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const exceptThisSymbols2 = ["e", "E", "+", "-"];

  return (
    <div>
      <form>
        <span><b>Nombre del Ticket: </b></span>
        <label htmlFor="type"></label>
        <input
          type="text"
          id="type"
          name="type"  maxlength="20" placeholder="Ej. Gratis, VIP, Preventa"
          value={type}
          onChange={(e) => setType(e.target.value)} required
        />
        <br/>
	<span><b>Tipo de Moneda: </b></span>
        <label htmlFor="currency"></label>
        <select
          id="currency"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)} required>
	  <option value="">Selecciona el tipo de Moneda</option>
             <option value="S/">Soles</option>
             <option value="$">Dolares</option>
             <option value="€">Euros</option>
	  </select>
        <br />
        <span><b>Precio: </b></span>
        <label htmlFor="price"></label>
        <input
          type="number"
          id="price"
          name="price" min="0" placeholder="0.00"
	  onKeyDown={e => exceptThisSymbols2.includes(e.key) && e.preventDefault() } step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)} required
        />
        <br />
        <span><b>Cantidad: </b></span>
        <label htmlFor="amount_ticket"></label>
        <input
          type="number"
          id="amount_ticket"
          name="amount_ticket" min="0" onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault() }
          value={amount_ticket}
          onChange={(e) => setAmount_ticket(e.target.value)} required
        />
      </form>
      <br />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}
