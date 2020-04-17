import React from 'react';

function Players({ numOfPlayers, currCards, decks}) {
  let counter = 1;
  let players = [];
  while (counter < numOfPlayers + 1){
    // if (counter === 1) {
      players.push(
        <div id="player" key={counter}>
          <div className="currentCard">{currCards[counter - 1]}</div>
          <div>Player {counter}</div> 
          <div>Number of Cards: {decks[counter - 1].length}</div>
        </div>
      );
    counter += 1;
    }
    // else if (counter === 2) {
    //   players.push(
    //     <div id="player" key={counter}>
    //       <div className="currentCard">{props.currCards[1]}</div>
    //     <div>Player {counter}</div> 
    //     <div>Number of Cards: {props.decks[1].length}</div>
    //   </div>
    //   )
    // }
    // else if (counter === 3) {
    //   players.push(
    //     <div id="player" key={counter}>
    //       <div className="currentCard">{props.currCards[2]}</div>
    //       <div>Player {counter}</div>
    //       <div>Number of Cards: {props.decks[2].length}</div>
    //     </div>
    //   );
    // }
    // else if (counter === 4) {
    //   players.push(
    //     <div id="player" key={counter}>
    //       <div className="currentCard">{props.currCards[3]}</div>
    //       <div>Player {counter}</div>
    //       <div>Number of Cards: {props.decks[3].length}</div>
    //     </div>
    //   );
    // }
    // counter += 1;
  // }

  return (
    <div id="decks">
      {players}
    </div>
  )
}

export default Players;