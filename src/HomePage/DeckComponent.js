import React from "react";
import { Link } from "react-router-dom";
function DeckComponent({ desk, handleDeleteButton }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{desk.name}</h5>
        <p>{desk.cards.length} cards</p>
        <p className="card-text">{desk.description}</p>
        <Link to={`/decks/${desk.id}`} className="btn btn-secondary">
          View
        </Link>

        <Link to={`/decks/${desk.id}/study`} className="btn btn-primary">
          Study
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckComponent;
