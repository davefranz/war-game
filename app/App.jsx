import React, { Component } from 'react';
import GameBoard from './containers/GameBoard.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GameBoard />
    )
  }
}

export default App;