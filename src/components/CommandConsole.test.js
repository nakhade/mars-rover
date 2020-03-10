import React from "react";
import { render } from "@testing-library/react";
import CommandConsole from "./CommandConsole";

test("renders title", () => {
  const { getByText } = render(<CommandConsole />);
  const linkElement = getByText(/Input Commands Console/i);
  expect(linkElement).toBeInTheDocument();
});
