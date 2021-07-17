import React from "react";
import { Link } from "react-router-dom";

function CardForm({ card, handleSubmit, handleChange, deckId }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="front">
        Front:
        <br></br>
        <textarea
          id="front"
          type="text"
          name="front"
          required
          placeholder="Front side of the card"
          autoFocus="on"
          rows="10"
          cols="60"
          onChange={handleChange}
          value={card.front}
        ></textarea>
      </label>
      <br></br>
      <label htmlFor="back">Back: </label>
      <br></br>
      <textarea
        id="back"
        type="text"
        name="back"
        required
        placeholder="Back of the card"
        autoFocus="on"
        rows="10"
        cols="60"
        onChange={handleChange}
        value={card.back}
      ></textarea>

      <br></br>
      <Link to={`/decks/${deckId}`} className="btn btn-secondary">
        Done
      </Link>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
