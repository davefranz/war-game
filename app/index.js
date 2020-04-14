import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      p1Deck : [],
      p2Deck: [],
      p3Deck: [],
      p4Deck: [],
    }
  }
  
  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value)
    })
  }

  createGame() {
    // create a deck
    // shuffle deck
    // pass out cards
  }

  createDeck() {

  }

  render() {
    return (
      <div>
        <h1>War A Card Game</h1>
        <div>
          <p>Enter the number of players</p>
          <label for="players">Number of Players (2-4): </label>
          <input type="number" id="players" name="players" min="2" max="4" value={this.state.numOfPplayers} onChange={e => this.handleChange(e)}></input>
          <button onClick={() => console.log('new game')}>New Game</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))