import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import Players from './players';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      p1Deck: [],
      p2Deck: [],
      p3Deck: [],
      p4Deck: [],
      p1Card: 5,
      p2Card: 10,
      p3Card: 'Q',
      p4Card: 'A',
    }
  }

  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value)
    })
  }

  dealDeck(array, numOfPlayers) {
    console.log('numOfPlayers IN DEAL DECK', numOfPlayers)
    const deck1 = [];
    const deck2 = [];
    const deck3 = [];
    const deck4 = [];
    let i = 1;
    while (array.length > 0) {
      const card = array.pop();
      if (i === 1) deck1.push(card);
      else if (i === 2) deck2.push(card);
      else if (i === 3) deck3.push(card);
      else if (i === 4) deck4.push(card);
      i += 1;
      if (i > numOfPlayers) i = 1;
      if (array.length === 0) break;
    }
    console.log('deck1 END OF DEALDECK', deck1)
    console.log('deck2 END OF DEALDECK', deck2)
    console.log('deck3 END OF DEALDECK', deck3)
    console.log('deck4 END OF DEALDECK', deck4)
    this.setState(
      {
        p1Deck: deck1,
        p2Deck: deck2,
        p3Deck: deck3,
        p4Deck: deck4,
      }
    )
  }

  createGame() {
    const deck = this.createDeck();
    const shuffled = this.shuffleDeck(deck);
    this.dealDeck(shuffled, this.state.numOfPlayers)
  }

  createDeck() {
    // function pushes 4 of each element to the deck array. returns a new deck each time it's invoked
    const deck = [];
    const elems = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    // pushes each element 4 times
    for (let i = 0; i < 4; i++) {
      deck.push(...elems);
    }
    // returns full deck array
    return deck;
  }

  shuffleDeck(array) {
    let counter = array.length;
    while (counter > 0) {
      let randomIdx = Math.floor(Math.random() * counter);
      counter--;
      let tempElem = array[counter];
      array[counter] = array[randomIdx];
      array[randomIdx] = tempElem;
    }
    return array;
  }

  render() {
    return (
      <div>
        <h1>War A Card Game</h1>
        <div>
          <p>Enter the number of players</p>
          <label htmlFor="players">Number of Players (2-4): </label>
          <input type="number" id="players" name="players" min="2" max="4" placeholder="2" value={this.state.numOfPplayers} onChange={e => this.handleChange(e)}></input>
          <button onClick={() => this.createGame()}>New Game</button>
          <Players numOfPlayers={this.state.numOfPlayers} p1Card={this.state.p1Card}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))