import React, { Component } from 'react'
import Players from '../components/Players.jsx';
import DisplayWinner from '../components/DisplayWinner.jsx';
import { createDeck, shuffleDeck, findWinner, checkForDuplicate } from '../utils';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      decks: [[], [], [], []],
      currCards: [],
      cardsToBeWon: [],
      winner: '',
    }
    this.createGame = this.createGame.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value),
      decks: [[], [], [], []],
      currCards: [],
      cardsToBeWon: [],
      winner: ''
    }, () => this.createGame());
  }

  newGame() {
    this.setState({
      decks: [[], [], [], []],
      currCards: [],
      cardsToBeWon: [],
      winner: ''
    }, () => this.createGame())
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
    const duplicateValue = checkForDuplicate(cards);
    const playerWithHighestCard = findWinner(cards);
    this.compareWinnerAndDuplicates(playerWithHighestCard, duplicateValue, cards);
  }

  // checks if more than one player has the highest card
  compareWinnerAndDuplicates(array, valueOfDuplicates, currCards) {
    const { decks, cardsToBeWon } = this.state;
    const totalWin = [];

    if (array[1] > valueOfDuplicates) {
      currCards.forEach(card => {
        if (card) decks[array[0]].unshift(card);
      })
      cardsToBeWon.forEach(card => {
        if (card) decks[array[0]].unshift(card);
      })
      this.setState({
        cardsToBeWon: [],
        winner: `${array[0] + 1}`
      })

      // if there is a tie and there were duplicates in the previous round
    } else if (cardsToBeWon.length > 0) {
      cardsToBeWon.forEach(card => {
        if (card) totalWin.push(card);
      })
      currCards.forEach(card => {
        if (card) totalWin.push(card);
      })
      this.setState({
        cardsToBeWon: totalWin,
        winner: 'TIE'
      });

      // if there is a tie - cards are saved to be won in the next round
    } else {
      this.setState({
        cardsToBeWon: currCards,
        winner: 'TIE'
      })
    }
  }

  componentDidMount() {
    this.createGame();
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
            <button data-testid="new-game" onClick={this.newGame}>New Game</button>
            <button data-testid="battle" onClick={() => this.battle(this.state.decks)}>Battle</button>
          </div>
        </div>
        <DisplayWinner winner={this.state.winner} />
        <Players numOfPlayers={this.state.numOfPlayers} decks={this.state.decks} currCards={this.state.currCards} />
      </div>
    )
  }
}

export default GameBoard;
