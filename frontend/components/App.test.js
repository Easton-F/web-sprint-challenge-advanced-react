import React from "react";
import { render, fireEvent , screen } from "@testing-library/react";
import AppFunctional from "./AppFunctional";
import 'jest-dom/extend-expect';

// Write your tests here
test('renders the AppFunctional component', () => {
  render(<AppFunctional />)
});


