import React from "react";
import { Link } from "react-router-dom";

function CardComponent({ card, handleCardDeleteButton }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-6">{card.front}</div>
            <div className="col-6">{card.back}</div>

            <div className="d-flex flex-row bd-highlight mb-3 justify-content-end">
              <div className="p-2 bd-highlight">
                {" "}
                <Link
                  to={`/decks/${card.deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
              </div>
              <div className="p-2 bd-highlight">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCardDeleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
