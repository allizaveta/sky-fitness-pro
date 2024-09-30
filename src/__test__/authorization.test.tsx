import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Authorization } from "../component/popups/authorization";
import ReduxProvider from "../store/reduxProvider";
import { MemoryRouter } from "react-router-dom";
import { AuthorizationProvider } from "../context/AuthorizationContext";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(
    <ReduxProvider>
      <MemoryRouter>
        <AuthorizationProvider>
          <Authorization />
        </AuthorizationProvider>
      </MemoryRouter>
    </ReduxProvider>
  );
  expect(true).toBeTruthy();
});
