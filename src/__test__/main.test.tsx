import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Main } from "../pages/main";
import { makeStore } from "../store/store";
import "@testing-library/jest-dom/extend-expect";

test("renders courses after loading", async () => {
  const store = makeStore();
  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );
  const courseElement = await screen.findByText("ab1c3f");
  expect(courseElement).toBeInTheDocument();
});
