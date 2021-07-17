import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function CreateDeck() {
  const history = useHistory();

  const initialFormState = {
    name: "default value of name",
    description: "default description",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData(
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

    createDeck(formData, abortController.signal).then((response) =>
      history.push(`/decks/${response.id}`)
    );
  };

  return (
    <div>
      <Breadcrumb url={"/"} text={"Create Deck"} />
      <h1>Create Deck</h1>
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
            // value={formData.name}
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
          cols="40"
          onChange={handleChange}
          // value={formData.description}
        ></textarea>

        <br></br>
        <Link to="/" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
