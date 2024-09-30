import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Authorization } from "../component/popups/authorization";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(<Authorization />);
  expect(true).toBeTruthy();
});
