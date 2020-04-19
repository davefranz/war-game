import React from 'react';

const Players = ({ numOfPlayers, currCards, decks }) => {
  let counter = 1;
  let players = [];
  while (counter < numOfPlayers + 1) {
    players.push(
      <div data-testid="player" id="player" key={counter}>
        <div data-testid="curr-card" className="currentCard">{currCards[counter - 1]}</div>
        <div>Player {counter}</div>
        <div data-testid="num-of-cards">Number of Cards: {decks[counter - 1].length}</div>
      </div>
    );
    counter += 1;
  }

  return (
    <div id="decks">
      {players}
    </div>
  )
}

export default Players;