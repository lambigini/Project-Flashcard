import React, { useEffect, useState } from "react";
import { useRouteMatch, Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [addCard, setAddCard] = useState({
    front: "",
    back: "",
    deckId: deckId,
  });

  const [currentDeck, setCurrentDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      const response = await readDeck(deckId, abortController.signal);

      setCurrentDeck((current) => ({ ...current, ...response }));
    }
    getCurrentDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setAddCard(
      (current) =>
        (current = {
          ...current,
          [target.name]: target.value,
        })
    );
  };

  const handleSubmit = (event) => {
    const abortController = new AbortController();
    event.preventDefault();

    const newcard = createCard(deckId, addCard, abortController.signal);

    setAddCard((current) => ({
      ...current,
      ["front"]: " ",
      ["back"]: " ",
      ["deckId"]: deckId,
    }));
  };

  return (
    <div>
      <Breadcrumb url={url} object={currentDeck} text={"Add Card"} />

      <h1>{currentDeck.name} Add Card</h1>

      <CardForm
        card={addCard}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
      />
    </div>
  );
}

export default AddCard;
