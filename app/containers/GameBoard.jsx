import React, { Component } from 'react';
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
    this.battle = this.battle.bind(this);
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
    const shuffledDeck = shuffleDeck(createDeck());
    const decks = {};
    let i = 1;
    while (shuffledDeck.length > 0) {
      const card = shuffledDeck.pop();
      const currentDeck = decks[`deck${i}`];
      if (!currentDeck) decks[`deck${i}`] = [card];
      else currentDeck.push(card); 
      i === this.state.numOfPlayers ? i = 1 : i += 1;
      if (shuffledDeck.length === 0) break;
    }

    // num players is now utilized everywhere instead of assuming 4 decks and having
    // to work around that
    const playerDecks = Array.from('x'.repeat(this.state.numOfPlayers)).map( (item, idx) => {
      if (decks[`deck${idx + 1}`]) return decks[`deck${idx + 1}`];
      else return [];
    });

    this.setState({
      decks: playerDecks
    });
  }

  // dealDeck(shuffledDeck) {
  //   const deck1 = [];
  //   const deck2 = [];
  //   const deck3 = [];
  //   const deck4 = [];
  //   let i = 1;
  //   while (shuffledDeck.length > 0) {
  //     const card = shuffledDeck.pop();
  //     if (i === 1) deck1.push(card);
  //     else if (i === 2) deck2.push(card);
  //     else if (i === 3) deck3.push(card);
  //     else if (i === 4) deck4.push(card);
  //     i += 1;
  //     if (i > this.state.numOfPlayers) i = 1;
  //     if (shuffledDeck.length === 0) break;
  //   }
  //   this.setState(
  //     {
  //       decks: [deck1, deck2, deck3, deck4]
  //     }
  //   )
  // }

  // Pops a card from each deck to be played
  battle() {
    const currCards = this.state.decks.reduce(
      (accumulator, deck) => accumulator.concat(deck.pop()),
      []
    );

    // look up why the second arg of set state is important
    this.setState({ currCards }, this.compareWinnerAndDuplicates);
  }

  // determines winner
  compareWinnerAndDuplicates() {
    const { cardsToBeWon, currCards } = this.state;
    const decks = [...this.state.decks];
    const [playerWithHighestCard, highestValue] = findWinner(currCards);
    const duplicateValue = checkForDuplicate(currCards);
    const totalWin = [];

    if (highestValue > duplicateValue) {
      currCards.forEach(card => {
        if (card) decks[playerWithHighestCard].unshift(card);
      })
      cardsToBeWon.forEach(card => {
        if (card) decks[playerWithHighestCard].unshift(card);
      })
      this.setState({
        cardsToBeWon: [],
        winner: `${playerWithHighestCard + 1}`
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
            <button data-testid="battle" onClick={this.battle}>Battle</button>
          </div>
        </div>
        <DisplayWinner winner={this.state.winner} />
        <Players numOfPlayers={this.state.numOfPlayers} decks={this.state.decks} currCards={this.state.currCards} />
      </div>
    )
  }
}

export default GameBoard;
