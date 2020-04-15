import React, { Component } from 'react';
import GameBoard from './containers/GameBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GameBoard />
      </div>
    )
  }
}

export default App;