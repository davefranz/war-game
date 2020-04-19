import React from "react";
import GameBoard from '../app/containers/GameBoard.jsx';
import Players from '../app/components/Players.jsx';
import App from '../app/App';
import {
  render, cleanup, container,
  fireEvent
} from '@testing-library/react';
// import {
//   build,
//   fake
// } from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect';
import { Simulate } from "react-dom/test-utils";
import { add, sayName, createDeck, shuffleDeck, findWinner, checkForDuplicate } from '../app/utils';


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// test('load game board', () => {
//   const {
//     getByTestId
//   } = render(<GameBoard />);
//   expect(getByText("New Game")).toHaveTextContent("New Game");
// });
afterEach(cleanup)

it('testing add function in utility folder', () => {
  const value = add(1, 2);
  expect(value).toBe(3);
})

it('testing sayName function in utility folder', () => {
  const greeting = sayName('Dave');
  expect(greeting).toBe(`Hello Dave!!!`);
})

it('createDeck returns an array with length 52', () => {
  const deck = createDeck();
  expect(deck.length).toBe(52);
})

it('shuffleDeck randomizes the order of the input array', () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const shuffled = shuffleDeck(input);
  expect(shuffled.length).toBe(10);
  expect(shuffled[0]).not.toBe(1)
})

it('findWinner returns the index of highest number in an array and the value', () => {
  const input = [8, 10, 14, 6];
  const winner = findWinner(input);
  expect(winner.length).toBe(2);
  expect(winner[0]).toBe(2);
  expect(winner[1]).toBe(14);
})

it('checkForDuplicates returns 0 if there are no duplicates in the input array', () => {
  const input = [8, 10, 14, 6];
  const dups = checkForDuplicate(input);
  expect(dups).toBe(0);
})

it('checkForDuplicates returns the value of duplicates in the input array', () => {
  const input = [8, 2, 2, 6];
  const dups = checkForDuplicate(input);
  expect(dups).toBe(2);
})

// describe('My Test Suite', () => {
  it('Control Test Case true equals true', () => {
    expect(true).toEqual(true);
  });
// });

it('Checks Title', () => {
  const { container, getByText } = render(<GameBoard />)
  expect(getByText('War: A Card Game')).toBeInTheDocument()
  // expect(getByText('War: A Card Game')).toBeInTheDocument()
  // expect(container.firstChild).toMatchInlineSnapshot(`
  //   <h1>War: A Card Game</h1>
  // `)
})

// it('should take a snapshot', () => {
//   const { asFragment } = render(<App />)
//   expect(asFragment(<App />)).toMatchSnapshot()
// });

it('button should have text New Game', () => {
  // Arrange
  // const numOfCards = 26;
  const { getByTestId, getByText } = render(<GameBoard />);
  // Act
  // Simulate.click(getByText('New Game'))
  // Assert
  expect(getByTestId('new-game')).toHaveTextContent('New Game');
  expect(getByText('Battle')).toHaveTextContent('Battle');
  expect(getByText('Player 2')).toHaveTextContent('Player 2');
  // expect(getByTestId(`Number of Cards: ${numOfCards}`)).toHaveTextContent(`Number of Cards: ${numOfCards}`)
});


it('two players', () => {
  const { queryAllByTestId } = render(<GameBoard />);
  const players = queryAllByTestId('player');
  expect(players).toHaveLength(2)
});

it('three players', () => {
  const numOfPlayers = 3;
  const currCards = [2, 4, 6];
  const decks = [[1, 1, 1], [2, 2, 2], [3, 3, 3], []]
  const { queryAllByTestId } = render(<Players numOfPlayers={numOfPlayers} currCards={currCards} decks={decks}/>);
  // const select = document.querySelector('select');
  // select.value = 3;

  // Simulate.click(getByText('New Game'))
  
  const players = queryAllByTestId('player');
  expect(players).toHaveLength(3);
});

// this works!!!
it('onchange the selector value updates the number of players displayed ', () => {
  const { getByTestId, queryAllByTestId } = render(<GameBoard />)
  let numOfPlayers = 4;
  const select = getByTestId('select-num-of-players');
  select.value = numOfPlayers;
  fireEvent.change(select);
  const players = queryAllByTestId('player');
  
  expect(select.value).toBe("4")
  expect(players).toHaveLength(4)
});

// Tests the main app component
it('when main app is rendered title is displayed', () => {
  const { getByText } = render(<App />)
  expect(getByText('War: A Card Game')).toBeInTheDocument()
})


  // it('testing create deck', () => {
  //   const wrapper = render(<BoardGame />);
  //   expect(wrapper.instance().checkBoxChecked()).equals(true);
  // });


// test('player cards to be 26 for two player game', async () => {
//   const { getByText, getAllByTestId } = render(<GameBoard />)

//   // Click button
//   fireEvent.click(getByText('New Game'))

//   // Wait for page to update with query text
//   const items = await getAllByTestId('player')
//   expect(items).toHaveLength(2)
// })

// test('add', () => {
//   const value = App.add(1, 2);
//   expect(value).toBe(3)
// })