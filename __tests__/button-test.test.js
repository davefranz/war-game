import React from "react";
import GameBoard from '../app/containers/GameBoard.jsx';
import {
  render,
  fireEvent
} from '@testing-library/react';
import {
  build,
  fake
} from 'test-data-bot';
import '@testing-library/jest-dom/extend-expect'

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

test('load game board', () => {
  const {
    getByText
  } = render(<GameBoard />);
  expect(getByText("New Game")).toHaveTextContent("New Game");
});