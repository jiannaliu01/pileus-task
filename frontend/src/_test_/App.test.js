import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
