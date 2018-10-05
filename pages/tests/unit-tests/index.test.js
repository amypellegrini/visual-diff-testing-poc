import Index from "../../index";
import React from "react";
import { render } from "react-testing-library";

describe("Index page", () => {
  test("renders", () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });
});
