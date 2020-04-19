import React, { Component } from 'react'
import Players from '../components/Players.jsx';
import { createDeck, shuffleDeck, findWinner, checkForDuplicate } from '../utils';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      decks: [[], [], [], []],
      currCards: [],
      cardsToBeWon: [],
    }

    // Do all functions need to be bound?
    this.createGame = this.createGame.bind(this);
  }

  sayHi() {
    return 'hi'
  }
  
  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value)
    })
  }

  createGame() {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    this.dealDeck(shuffled, this.state.numOfPlayers)
  }

  dealDeck(array, numOfPlayers) {
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
    this.setState(
      {
        decks: [deck1, deck2, deck3, deck4]
      }
    )
  }

  // Pops a card from each deck to be played and determines winner
  battle(array) {
    const cards = [];
    array.forEach(deck => {
      if (deck.length === 0) deck[0] = 0;
      let card = deck.pop();
      cards.push(card);
    })
    this.setState(
      {
        currCards: cards
      }
    )
    const duplicateCount = checkForDuplicate(cards);
    const playerWithHighestCard = findWinner(cards);
    this.compareWinnerAndDuplicates(playerWithHighestCard, duplicateCount, cards);
  }

  // checks if more than one player has the highest card
  compareWinnerAndDuplicates(array, numOfDups, currCards) {
    const { decks, cardsToBeWon } = this.state;
    const totalWin = [];
    // checks if highest card is played by multiple players
    // if single winner cards are given to the winner
    // [2, 4, 6, 0][[1, 5], [3, 4], [1, 3], [0]]
    if (array[1] > numOfDups) {
      currCards.forEach(card => {
        if (card) decks[array[0]].unshift(card);
      })
      cardsToBeWon.forEach(card => {
        if (card) decks[array[0]].unshift(card);
      })
      this.setState({
        cardsToBeWon: []
      })

      // if there is a tie and there were duplicates in the previous round
    } else if (cardsToBeWon.length > 0) {
      // totalWin.push(...currCards);
      cardsToBeWon.forEach(card => {
        if (card) totalWin.push(card);
      })
      currCards.forEach(card => {
        if (card) totalWin.push(card);
      })
      this.setState({
        cardsToBeWon: totalWin
      });

      // if there is a tie cards are saved to be won in the next round
    } else {
      this.setState({
        cardsToBeWon: currCards
      })
    }
  }

  render() {
    return (
      <div id="gamePlay">
        <h1>War: A Card Game</h1>
        <div>
          <div id="numOfPlayers">
            <label htmlFor="players">Enter the Number of Players (2-4): </label>
            <select data-testid="select-num-of-players" type="number" id="players" name="players" value={this.state.numOfPplayers} onChange={e => this.handleChange(e)}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div id="btns">
            <button data-testid="new-game" onClick={this.createGame}>New Game</button>
            {/* <button onClick={() => this.createGame()}>New Game</button> */}
            <button data-testid="battle" onClick={() => this.battle(this.state.decks)}>Battle</button>
          </div>
        </div>
        <Players numOfPlayers={this.state.numOfPlayers} decks={this.state.decks} currCards={this.state.currCards} />
        {/* <button onClick={() => this.createGame()}>Auto Complete Game</button> */}
      </div>
    )
  }
}

export default GameBoard;