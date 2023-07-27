import React from "react";
import { render, fireEvent , screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";
import 'jest-dom/extend-expect';

// Write your tests here
test('submit button renders', () => {
  render(<AppFunctional />)

  expect(screen.getByTestId('submit')).toBeInTheDocument();
});

test('reset button renders', () => {
  render(<AppFunctional />)

  expect(screen.getByTestId('reset')).toBeInTheDocument();
});

