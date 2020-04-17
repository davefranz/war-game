import React, { Component } from 'react'
import Players from '../components/Players.jsx';

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

  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value)
    })
  }

  createGame() {
    const deck = this.createDeck();
    const shuffled = this.shuffleDeck(deck);
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

  // Used numbers to represent face cards (ex. 11 = 'Jack')
  createDeck() {
    const deck = [];
    const elems = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    for (let i = 0; i < 4; i++) {
      deck.push(...elems);
    }
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
    const duplicateCount = this.checkForDuplicate(cards);
    const playerWithHighestCard = this.findWinner(cards);
    this.compareWinnerAndDuplicates(playerWithHighestCard, duplicateCount, cards);
  }

  // Checks if the same card is played
  checkForDuplicate(array) {
    const cardCount = {};
    const checkCurrCards = [...array];
    let isSameValue = false;
    let dupCardValue;

    checkCurrCards.forEach(card => {
      cardCount[card] = (cardCount[card] || 0) + 1;
    })

    Object.entries(cardCount).forEach(pair => {
      if (pair[1] > 1) {
        isSameValue = true;
        dupCardValue = Number(pair[0]);
      }
    })
 
    return isSameValue ? dupCardValue : 0
  }

  // checks if more than one player has the highest card
  compareWinnerAndDuplicates(array, numOfDups, currCards) {
    const totalWin = [];
    
    // checks if highest card is played by multiple players
    // if single winner cards are given to the winner
    if (array[1] > numOfDups) {
      currCards.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      this.state.cardsToBeWon.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      this.setState({
        cardsToBeWon: []
      })

    // if there is a tie and there were duplicates in the previous round
    } else if (this.state.cardsToBeWon.length > 0) {
      // totalWin.push(...currCards);
      this.state.cardsToBeWon.forEach(card => {
        if (card !== 0) totalWin.push(card);
      })
      currCards.forEach(card => {
        if (card !== 0) totalWin.push(card);
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

  // finds highest card and which player it belongs to
  findWinner(array) {
    let highestValue = 0;
    let playerIdx;
    for (let i = 0; i < array.length; i += 1) {
      if (array[i] > highestValue) {
        highestValue = array[i];
        playerIdx = i;
      }
    }
    return [playerIdx, highestValue]
  }


  render() {
    return (
      <div id="gamePlay">
        <h1>War: A Card Game</h1>
        <div>
          <div id="numOfPlayers">
            <label htmlFor="players">Enter the Number of Players (2-4): </label>
            <select type="number" id="players" name="players" value={this.state.numOfPplayers} onChange={e => this.handleChange(e)}>
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
        <Players data-testid="player" numOfPlayers={this.state.numOfPlayers} decks={this.state.decks} currCards={this.state.currCards} />
        {/* <button onClick={() => this.createGame()}>Auto Complete Game</button> */}
      </div>
    )
  }
}

export default GameBoard;