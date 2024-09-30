import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { makeStore } from "../store/store";
import { Header } from "../component/header";
import { AuthorizationProvider } from "../context/AuthorizationContext";

describe("Header Component", () => {
  it("does not render any user data when not authenticated", () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthorizationProvider>
            <Header />
          </AuthorizationProvider>
        </MemoryRouter>
      </Provider>
    );
  });
});
