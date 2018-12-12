import Login from "../../login";
import React from "react";
import { render } from "react-testing-library";

describe("Login page", () => {
  test("renders", () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
