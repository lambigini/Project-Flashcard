import React, { useEffect, useState } from "react";
import { useRouteMatch, Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

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

    console.log("newcard,", newcard);

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
            value={addCard.front}
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
          value={addCard.back}
        ></textarea>

        <br></br>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
