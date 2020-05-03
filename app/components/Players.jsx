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

// alternative solution
// it is more in keeping with the react communities style to try to use
// map or other array methods that return values
// React is heavily inspired by functional programming
// which prefers these sorts of array operations.
// There's nothing wrong with your solution
// But it is good to see how many developers prefer to do this sort of thing when using react
/*
const Players = ({ numOfPlayers, currCards, decks }) => (
  <div id="decks">
    {Array.from('x'.repeat(numOfPlayers)).map((item, counter) => (
            <div data-testid="player" id="player" key={counter + 1}>
            <div data-testid="curr-card" className="currentCard">{currCards[counter]}</div>
            <div>Player {counter + 1}</div>
            <div data-testid="num-of-cards">Number of Cards: {decks[counter].length}</div>
          </div>
    ))}
  </div>
)
*/

export default Players;


