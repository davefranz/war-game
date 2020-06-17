import React from "react";
import DisplayWinner from '../app/components/DisplayWinner.jsx';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('display winner componen tests', () => {
  it("renders", () => { 
    const { asFragment } = render(<DisplayWinner winner="Barbara" />);
    expect(asFragment()).toMatchSnapshot();
  });
})