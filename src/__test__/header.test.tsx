import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { makeStore } from "../store/store";
import { Header } from "../component/header";
import { AuthorizationProvider } from "../context/AuthorizationContext";

describe("Header Component", () => {
  it("does not render any user data when not authenticated", () => {
    // Create the store for the test
    const store = makeStore();

    // Render the Header component wrapped in Provider and MemoryRouter
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizationProvider>
            <Header />
          </AuthorizationProvider>
        </MemoryRouter>
      </Provider>
    );

    // Add your assertions here
  });
});
