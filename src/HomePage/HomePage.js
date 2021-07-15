import React from "react";
import { Route, Switch } from "react-router";
import Decklist from "./DeckList";

export function Homepage({ listDesks, handleDeleteButton }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Decklist
            listDesks={listDesks}
            handleDeleteButton={handleDeleteButton}
          />
        </Route>
      </Switch>
    </div>
  );
}
