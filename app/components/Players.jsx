import React from 'react';

const Players = ({ numOfPlayers, currCards, decks }) => {
  let counter = 1;
  let players = [];
  while (counter < numOfPlayers + 1) {
    players.push(
      <div id="player" key={counter}>
        <div className="currentCard">{currCards[counter - 1]}</div>
        <div>Player {counter}</div>
        <div>Number of Cards: {decks[counter - 1].length}</div>
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