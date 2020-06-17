import React from "react";
import GameBoard from '../app/containers/GameBoard.jsx';
import { render, cleanup, fireEvent, getNodeText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('GameBoard method tests', () => {

  it('GameBoard component initially renders with expected text and values for two players', () => {
    const { getByText, queryAllByTestId } = render(<GameBoard />);
    const players = queryAllByTestId('player');

    expect(getByText('War: A Card Game')).toBeInTheDocument();
    expect(getByText('New Game')).toBeInTheDocument();
    expect(getByText('Battle')).toBeInTheDocument();
    expect(getByText('Player 2')).toBeInTheDocument();
    expect(players).toHaveLength(2);
    expect(players).not.toHaveLength(3);
  });

  it('Changing number of players to 4 will display 4 players', () => {
    const { getByTestId, queryAllByTestId } = render(<GameBoard />)
    const select = getByTestId('select-num-of-players');
    const numOfPlayers = 4;
    select.value = numOfPlayers;

    fireEvent.change(select);
    const players = queryAllByTestId('player');

    expect(select.value).toBe("4");
    expect(players).toHaveLength(4);
  });

});

describe('battle button', () => {
  it('should display a card value within the range of 0-14', () => {
    const { getByTestId } = render(<GameBoard />)
    fireEvent.click(getByTestId('battle'));
    const actualCard = getNodeText(getByTestId('curr-card-0'))
    expect(actualCard > 0 && actualCard < 15).toBe(true)
  })
})
