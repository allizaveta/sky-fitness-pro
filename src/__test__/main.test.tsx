import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Main } from "../pages/main";
import { makeStore } from "../store/store";

test("renders Main component", () => {
  // Создаем экземпляр хранилища
  const store = makeStore();

  // Рендерим компонент Main внутри Provider для доступа к Redux store
  const { container } = render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  // Проверяем, что компонент Main рендерится
  expect(container).toBeInTheDocument();
});
