import React from 'react';

// this is a little small to be its own component
const DisplayWinner = ({ winner }) => {
  if (!winner) return <p id="winner">Click Battle to Begin</p>;
  else if (winner.length > 1) return <p id="winner">{winner}!</p>;
  else return <p id="winner">PLAYER {winner} WINS!</p>; 
}

export default DisplayWinner;