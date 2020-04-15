import React from 'react';

function Players(props) {
  console.log('props in Players function', props)
  let counter = 1;
  let players = [];
  while (counter < props.numOfPlayers + 1){
    console.log(counter)
    if (counter === 1) {
      players.push(
        <div key={counter}>
          <div>Player {counter}</div> 
          <div>Current Card: {props.currCards[0]}</div>
          <div>Number of Cards: {props.decks[0].length}</div>
        </div>
      );
    }
    else if (counter === 2) {
      players.push(
      <div key={counter}>
        <div>Player {counter}</div> 
        <div>Current Card: {props.currCards[1]}</div>
        <div>Number of Cards: {props.decks[1].length}</div>
      </div>
      )
    }
    else if (counter === 3) {
      players.push(
        <div key={counter}>
          <div>Player {counter}</div>
          <div>Current Card: {props.currCards[2]}</div>
          <div>Number of Cards: {props.decks[2].length}</div>
        </div>
      );
    }
    else if (counter === 4) {
      players.push(
        <div key={counter}>
          <div>Player {counter}</div>
          <div>Current Card: {props.currCards[3]}</div>
          <div>Number of Cards: {props.decks[3].length}</div>
        </div>
      );
    }
    counter += 1;
  }

  return (
    <div>
      <h1>Hello</h1>
      <h1>{props.numOfPlayers}</h1>
      {players}
    </div>
  )
}

export default Players;