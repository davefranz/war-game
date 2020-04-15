import React from 'react';

function Players(props) {
  console.log('props in Players function', props)
  let counter = 1;
  let players = [];
  while (counter < props.numOfPlayers + 1){
    console.log(counter)
    if (counter === 1) {
      players.push(
        <div key={counter}>{props.p1Card}</div>
      );
    }
    else if (counter === 2) {
      players.push(
        <div>props.p2Card</div>
      );
    }
    else if (counter === 3) {
      players.push(
        <div>props.p3Card</div>
      );
    }
    else if (counter === 4) {
      players.push(
        <div>props.p4Card</div>
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