import React from "react";
import Players from '../app/components/Players.jsx';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('Players component tests', () => {
  const numOfPlayers = 3;
  const currCards = [2, 4, 6];
  const decks = [[1, 1, 1, 1], [2, 2, 2, 2, 2], [3], []];

  it('three players are correctly displayed', () => {
    const { queryAllByTestId } = render(<Players numOfPlayers={numOfPlayers} currCards={currCards} decks={decks} />);
    const players = queryAllByTestId('player');
    expect(players).toHaveLength(3);
  })
  
  it('Number of cards in each player deck is correctly displayed', () => {
    const { queryAllByTestId } = render(<Players numOfPlayers={numOfPlayers} currCards={currCards} decks={decks} />);
    expect(queryAllByTestId('num-of-cards')[0]).toHaveTextContent('Number of Cards: 4');
    expect(queryAllByTestId('num-of-cards')[1]).toHaveTextContent('Number of Cards: 5');
    expect(queryAllByTestId('num-of-cards')[2]).toHaveTextContent('Number of Cards: 1');
  })

  it('Current card for all players is correctly displayed', () => {
    const { queryAllByTestId } = render(<Players numOfPlayers={numOfPlayers} currCards={currCards} decks={decks} />);
    expect(queryAllByTestId('curr-card')[0]).toHaveTextContent('2');
    expect(queryAllByTestId('curr-card')[1]).toHaveTextContent('4');
    expect(queryAllByTestId('curr-card')[2]).toHaveTextContent('6');
  })
});


