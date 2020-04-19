import React from "react";
import App from '../app/App';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('App component tests', () => {

  it('App component renders and displays text', () => {
    const { getByText } = render(<App />)
    expect(getByText('War: A Card Game')).toBeInTheDocument()
  })

})
