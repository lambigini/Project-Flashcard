import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import DecksRoute from "../DecksRoute/DecksRoute";
import { Homepage } from "../HomePage/HomePage";
import { listDecks } from "../utils/api/index";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  const [listDesks, setListDesks] = useState([]);

  useEffect(() => {
    async function getListOfDesk() {
      const listOfDesksFromAPI = await listDecks();

      setListDesks((current) => (current = listOfDesksFromAPI));
    }

    getListOfDesk();
  }, [listDecks]);

  const handleDeleteButton = (indexToDeleted) => {
    const message = "Do you really want to Delete this Deck?";
    const result = window.confirm(message);
    {
      result &&
        setListDesks((current) =>
          current.filter((deck, index) => index !== indexToDeleted)
        );
    }
  };
  return (
    <div>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Homepage
              listDesks={listDesks}
              handleDeleteButton={handleDeleteButton}
            />
          </Route>

          <Route path="/decks/">
            <DecksRoute listDesks={listDesks} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
