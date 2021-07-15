import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, listCards, readDeck } from "../utils/api";
import CardComponent from "./CardComponent";
import Breadcrumb from "./Breadcrumb";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({
    id: 0,
    name: "",
    description: "",
    cards: [],
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      const response = await readDeck(deckId, abortController.signal);

      setCurrentDeck((current) => ({ ...current, ...response }));
    }
    getCurrentDeck();
  }, [deckId]);

  const handleCardDeleteButton = (id) => {
    const abortController = new AbortController();
    const message = "Do you really want to Delete this Card?";
    const result = window.confirm(message);

    {
      result &&
        deleteCard(id, abortController.signal).then(window.location.reload());
    }
  };
  const cards = currentDeck.cards.map((card, index) => {
    return (
      <CardComponent
        key={card.id}
        card={card}
        handleCardDeleteButton={() => handleCardDeleteButton(card.id)}
      />
    );
  });

  const handleDeleteButton = (event) => {
    console.log("event ", event);
    const abortController = new AbortController();
    const message = "Do you really want to Delete this Deck?";
    const result = window.confirm(message);
    {
      result &&
        deleteDeck(deckId, abortController.signal).then((respone) => {
          history.push("/");
          window.location.reload();
        });
    }
  };

  if (currentDeck && cards) {
    return (
      <div>
        <Breadcrumb text={currentDeck.name} />

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{currentDeck.name}</h5>
            <p className="card-text">{currentDeck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
              Edit
            </Link>

            <Link
              to={`/decks/${currentDeck.id}/study`}
              className="btn btn-primary"
            >
              Study
            </Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
              Add Card
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteButton}>
              Delete
            </button>
          </div>
        </div>
        <h2>Cards</h2>

        <div>{cards}</div>
      </div>
    );
  }

  return <h2>...Loading</h2>;
}

export default Deck;
