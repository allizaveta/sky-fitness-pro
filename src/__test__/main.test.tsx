import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Main } from "../pages/main";
import { makeStore } from "../store/store";

test("renders Main component", () => {
  const store = makeStore();

  const { container } = render(
    <Provider store={store}>
      <Main />
    </Provider>
  );
  expect(container).toBeInTheDocument();
});
