import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function Study() {
  const [deckObject, setDeckObject] = useState({});
  const params = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  const [cardNeedStudy, setCardNeedStudy] = useState({
    cards: [],
    cardNumber: 0,
    cardLength: 0,
    side: "front",
    flip: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const deckObjectFromAPI = readDeck(params.deckId, abortController.signal)
      .then((response) => {
        setDeckObject((current) => (current = { ...current, ...response }));

        setCardNeedStudy(
          (current) =>
            (current = {
              ...current,
              cards: response.cards,
              cardLength: response.cards.length,
            })
        );
      })
      .catch((error) => console.log("ERROR", error));
  }, [params.deckId]);

  const handleButtonClick = () => {
    if (cardNeedStudy.side === "front") {
      setCardNeedStudy(
        (current) =>
          (current = {
            ...current,
            ["flip"]: !current["flip"],
            side: "back",
          })
      );
    } else {
      setCardNeedStudy(
        (current) =>
          (current = {
            ...current,
            ["flip"]: !current["flip"],
            side: "front",
          })
      );
    }
  };

  const handleNextButton = () => {
    // change current card to next card
    if (cardNeedStudy.cardNumber < cardNeedStudy.cardLength) {
      setCardNeedStudy(
        (current) =>
          (current = {
            ...current,
            ["cardNumber"]: current.cardNumber++,
            ["side"]: "front",
            ["flip"]: !current["flip"],
          })
      );

      if (
        cardNeedStudy.cardNumber === cardNeedStudy.cardLength - 1 &&
        cardNeedStudy.flip
      ) {
        const message = "Restart card?";
        const result = window.confirm(message);
        {
          result
            ? setCardNeedStudy((current) => ({ ...current, ["cardNumber"]: 0 }))
            : history.push("/");
        }
      }
    }
  };

  function notEnoughCard() {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href={`${url}`}> Rendering in React </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{deckObject.name} </h5>
            <h6 className="card-subtitle mb-2 text-muted">Not enough cards</h6>
            <p className="card-text">
              You need at least 3 cards to study. There are{" "}
              {cardNeedStudy.cardLength} in this desk
            </p>

            <Link to="/decks/new" className="btn btn-primary">
              Add Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function haveEnoughCard() {
    return (
      <div>
        <Breadcrumb url={url} object={deckObject} text={"Study"} />

        <div className="card">
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Card {cardNeedStudy.cardNumber + 1} of {cardNeedStudy.cardLength}
            </h6>
            <p className="card-text">
              {
                cardNeedStudy.cards[cardNeedStudy.cardNumber][
                  cardNeedStudy.side
                ]
              }
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleButtonClick}
            >
              Flip
            </button>
            {cardNeedStudy.flip && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextButton}
                id="nextBtn"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (cardNeedStudy.cards.length < 3) {
    return notEnoughCard();
  } else {
    return haveEnoughCard();
  }
}

export default Study;
