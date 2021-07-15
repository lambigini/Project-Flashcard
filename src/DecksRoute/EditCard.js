import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function EditCard() {
  const { deckId, cardId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [updateCurrentCard, setUpdateCurrentCard] = useState({
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

      const loadCard = await readCard(cardId, abortController.signal);

      setUpdateCurrentCard((current) => ({ ...current, ...loadCard }));
    }
    getCurrentDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setUpdateCurrentCard(
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

    const newcard = updateCard(updateCurrentCard, abortController.signal);

    console.log("newcard,", newcard);

    setUpdateCurrentCard((current) => ({
      ...current,
      ["front"]: " ",
      ["back"]: " ",
      ["deckId"]: deckId,
    }));

    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <Breadcrumb url={url} object={currentDeck} text={`Edit Card ${cardId}`} />

      <h1> Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Front:
          <br></br>
          <textarea
            id="front"
            type="text"
            name="front"
            required
            // placeholder="Front side of the card"
            autoFocus="on"
            rows="10"
            cols="60"
            onChange={handleChange}
            value={updateCurrentCard.front}
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
          value={updateCurrentCard.back}
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

export default EditCard;
