import React from "react";
import { Link } from "react-router-dom";
import DeckComponent from "./DeckComponent";

function DeckList({ listDesks, handleDeleteButton }) {
  const listNumOfDesks = listDesks.map((desk, index) => (
    <DeckComponent
      desk={desk}
      key={index}
      handleDeleteButton={() => handleDeleteButton(index)}
    />
  ));

  return (
    // list of desks
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>
      {listNumOfDesks}
    </div>
  );
}
export default DeckList;
