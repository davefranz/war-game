import React, { Component } from 'react'
import ReactDOM from 'react-dom';
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
  }

  handleChange(e) {
    this.setState({
      numOfPlayers: Number(e.target.value)
    })
  }

  dealDeck(array, numOfPlayers) {
    // console.log('numOfPlayers IN DEAL DECK', numOfPlayers)
    const deck1 = [];
    const deck2 = [];
    const deck3 = [];
    const deck4 = [];
    const output = [];
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

    // console.log('deck1 END OF DEALDECK', deck1)
    // console.log('deck2 END OF DEALDECK', deck2)
    // console.log('deck3 END OF DEALDECK', deck3)
    // console.log('deck4 END OF DEALDECK', deck4)
    this.setState(
      {
        decks: [deck1, deck2, deck3, deck4]
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

  battle(array) {
    // console.log('decks array in battle', array)
    const cards = [];
    array.forEach(deck => {
      // console.log('deck in forEach loop', deck)
      if (deck.length === 0) deck[0] = 0;
      // if (deck.length > 0) {
      let card = deck.pop();
      cards.push(card);
      // }
    })
    this.setState(
      {
        currCards: cards
      }
    )
    console.log('IN BATTLE BEFORE CHECKS')
    const duplicateCount = this.checkForDuplicate(cards);
    console.log('DUPLICATE COUNT', duplicateCount)

    const playerWithHighestCard = this.findWinner(cards);
    console.log('PLAYER WITH HIGHEST CARD', playerWithHighestCard);

    this.compareWinnerAndDuplicates(playerWithHighestCard, duplicateCount, cards)
    console.log('IN BATTLE AFTER CHECKS')
  }

  // checks if same card is played returns 0 or number greater than 1
  checkForDuplicate(array) {
    console.log('input array of checkForDups', array)
    const cardCount = {};
    const checkCurrCards = [...array];
    console.log('checkCurrCards array', checkCurrCards)
    checkCurrCards.forEach(card => {
      console.log('card in forEach loop', card)
      cardCount[card] = (cardCount[card] || 0) + 1;
      // if (!(card in cardCount)) cardCount[card] = true;
      // else duplicate = true
      console.log('cardCount 1', cardCount)
    })

    let isSameValue = false;
    let dupCardValue;
    Object.entries(cardCount).forEach(pair => {
      if (pair[1] > 1) {
        isSameValue = true;
        dupCardValue = Number(pair[0]);
      }
    })
    console.log('cardCount 2', cardCount)
    return isSameValue ? dupCardValue : 0
  }

  // compares duplicate value to highest value and gives winner cards or if there is a duplicate update cards to be won
  compareWinnerAndDuplicates(array, cardValue, currCards) {
    console.log('ARRAY IN WINNER DUP CHECK', array)
    console.log('cardValue IN WINNER DUP CHECK', cardValue)
    console.log('currCards IN WINNER DUP CHECK', currCards)
    if (cardValue === 0) {
      console.log('IN FIRST IF STATEMENT')
      currCards.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      this.state.cardsToBeWon.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      // this.state.decks[array[0]].unshift(...this.state.cardsToBeWon);
      console.log('END OF FIRST IF STATEMENT')
      this.setState({
        cardsToBeWon: []
      })
    } else if (array[1] > cardValue) {
      // this.state.decks[array[0]].unshift(...currCards, ...this.state.cardsToBeWon);
      currCards.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      this.state.cardsToBeWon.forEach(card => {
        if (card !== 0) this.state.decks[array[0]].unshift(card);
      })
      this.setState({
        cardsToBeWon: []
      })
    } else if (this.state.cardsToBeWon.length > 0) {
      // let totalToWin = [...this.state.cardsToBeWon];
      totalToWin.push(...currCards);
      const totalWin = [];
      this.state.cardsToBeWon.forEach(card => {
        if (card !== 0) totalWin.unshift(card);
      })
      currCards.forEach(card => {
        if (card !== 0) totalWin.unshift(card);
      })
      this.setState({
        cardsToBeWon: totalToWin
      });
    } else {
      this.setState({
        cardsToBeWon: currCards
      })
    }
  }


  // find highest card and which player it belongs to
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
      <div>
        <h1>War A Card Game</h1>
        <div>
          <p>Enter the number of players</p>
          <label htmlFor="players">Number of Players (2-4): </label>
          <input type="number" id="players" name="players" min="2" max="4" placeholder="2" value={this.state.numOfPplayers} onChange={e => this.handleChange(e)}></input>
          <button onClick={() => this.createGame()}>New Game</button>
          <button onClick={() => this.battle(this.state.decks)}>Battle</button>
          <Players numOfPlayers={this.state.numOfPlayers} decks={this.state.decks} currCards={this.state.currCards} />
        </div>
      </div>
    )
  }
}

export default GameBoard;