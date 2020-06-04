import React from 'react';

// const Players = ({ numOfPlayers, currCards, decks }) => {
//   let counter = 1;
//   let players = [];
//   while (counter < numOfPlayers + 1) {
//     players.push(
//       <div data-testid="player" id="player" key={counter}>
//         <div data-testid="curr-card" className="currentCard">{currCards[counter - 1]}</div>
//         <div>Player {counter}</div>
//         <div data-testid="num-of-cards">Number of Cards: {decks[counter - 1].length}</div>
//       </div>
//     );
//     counter += 1;
//   }

//   return (
//     <div id="decks">
//       {players}
//     </div>
//   )
// }

const Players = ({ numOfPlayers, currCards, decks }) => {
  return  (
  <div id="decks">
    {Array.from('x'.repeat(numOfPlayers)).map((item, idx) => (
      <div data-testid="player" id="player" key={idx + 1}>
        <div data-testid="curr-card" className="currentCard">{currCards[idx]}</div>
        <div>Player {idx + 1}</div>
        <div data-testid="num-of-cards">Number of Cards: {decks[idx].length}</div>
      </div>
    ))}
  </div>
  )
}

export default Players;

