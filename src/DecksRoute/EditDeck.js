import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function EditDeck() {
  const [currentDeck, setCurrentDeck] = useState({});

  const { deckId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();

    async function getCurrentDeck() {
      const getDeckFromAPI = await readDeck(deckId, abortController.signal);

      setCurrentDeck((current) => ({ ...current, ...getDeckFromAPI }));
    }

    getCurrentDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCurrentDeck(
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

    updateDeck(currentDeck, abortController.signal).then(
      window.location.reload()
    );
  };

  return (
    <div>
      <Breadcrumb url={url} object={currentDeck} text={"Edit Deck"} />

      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <br></br>
          <input
            id="name"
            type="text"
            name="name"
            required
            placeholder="Deck Name"
            onChange={handleChange}
            value={currentDeck.name}
          />
        </label>
        <br></br>
        <label htmlFor="description">Description: </label>
        <br></br>
        <textarea
          id="description"
          type="text"
          name="description"
          required
          placeholder="Brief description of the deck"
          autoFocus="on"
          rows="10"
          cols="20"
          onChange={handleChange}
          value={currentDeck.description}
        ></textarea>

        <br></br>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
