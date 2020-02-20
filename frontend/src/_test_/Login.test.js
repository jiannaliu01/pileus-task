import React from "react";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginView from "../components/LoginView";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// afterEach(cleanup);

// it("should let you log in with correct username and password", () => {
//   const { container } = render(<LoginView />)
//   const email = container.querySelector('input[name="email"]')
//   const password = container.querySelector('input[name="password"]')
//   const submit = container.querySelector('button[type="submit"]')
//   expect(asFragment()).toMatchSnapshot();
// });
beforeEach(() => {
  jest.setTimeout(10000);
});

test("allows the user to login successfully", async () => {
  const history = createMemoryHistory();
  // mock out window.fetch for the test
  const { container, getByTestId, getByLabelText } = render(<LoginView />);
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  // const error = container.querySelector('input[name="emailError"]');
  const submit = container.querySelector('button[type="submit"]');

  const input = getByLabelText("Email");
  fireEvent.blur(input);

  await wait(() => {
    fireEvent.change(email, {
      target: {
        value: "mockname"
      }
    });
  });

  await wait(() => {
    fireEvent.change(password, {
      target: {
        value: "greenforever"
      }
    });
  });

  await wait(() => {
    fireEvent.click(submit);
  });

  await wait(() => {
    expect(getByTestId("emailError")).not.toBe(null);
    expect(getByTestId("emailError")).toHaveTextContent(
      "Invalid email address"
    );
  });
  // fill out the form
  // fireEvent.change(screen.getByLabelText(/email/i), {
  //   target: { value: "righway@cm.com" }
  // });
  // fireEvent.change(screen.getByLabelText(/password/i), {
  //   target: { value: "oiweruiowr" }
  // });

  // fireEvent.click(screen.getByText(/submit/i));

  // .toHaveTextContent() comes from jest-dom's assertions
  // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
  // but jest-dom will give you better error messages which is why it's recommended
  // expect(alert).toHaveTextContent(/congrats/i)
  // expect(window.localStorage.getItem("token")).toEqual(fakeUserResponse.token);
});
