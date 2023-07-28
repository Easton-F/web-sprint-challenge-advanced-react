import React from "react";
import { render, fireEvent , screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";
import server from '../../backend/mock-server';
import '@testing-library/jest-dom/extend-expect';

// Write your tests here
test('true equals true', () => {
  expect(true).toBe(true);
});

test('reset button renders', () => {
  render(<AppFunctional />)
  const resetButton = screen.getByText(/reset/i)
  expect(resetButton).toBeInTheDocument();
});

test('left and right buttons render', () => {
  render(<AppFunctional />)
  const leftButton = screen.getByText(/left/i)
  const rightButton = screen.getByText(/right/i)
  expect(leftButton).toBeInTheDocument();
  expect(rightButton).toBeInTheDocument();
});

test('up and down buttons render', () => {
  render(<AppFunctional />)
  const upButton = screen.getByText(/up/i)
  const downButton = screen.getByText(/down/i)
  expect(upButton).toBeInTheDocument();
  expect(downButton).toBeInTheDocument();
});

test('moves increase on button click', () => {
  render(<AppFunctional />)
  const count = screen.getByText(/0/i)
  const button = screen.getByText(/right/i)
  fireEvent.click(button)
  expect(count).not.toHaveTextContent('0');
});

test('up button moves active square up', () => {
  render(<AppFunctional />)
  const coordinates = screen.getByText(/coordinates/i)
  const upButton = screen.getByText(/up/i)
  fireEvent.click(upButton)
  expect(coordinates).toHaveTextContent("Coordinates (2, 1)")
});