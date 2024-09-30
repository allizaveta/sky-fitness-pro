import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Authorization } from "../component/popups/authorization";
import ReduxProvider from "../store/reduxProvider";
import { MemoryRouter } from "react-router-dom";
import { AuthorizationProvider } from "../context/AuthorizationContext";

jest.mock("../api", () => ({
  auth: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
const mockAuth = require("../api").auth;

describe("Authorization Component", () => {
  beforeEach(() => {
    mockAuth.mockReset();
  });

  test("Renders the Authorization component", () => {
    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Authorization />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );
    expect(screen.getByPlaceholderText("Логин")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Пароль")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
    expect(screen.getByText("Зарегистрироваться")).toBeInTheDocument();
  });

  test("Allows user to input login and password", () => {
    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Authorization />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const loginInput = screen.getByPlaceholderText("Логин");
    const passwordInput = screen.getByPlaceholderText("Пароль");

    fireEvent.change(loginInput, { target: { value: "test_user" } });
    fireEvent.change(passwordInput, { target: { value: "test_password" } });

    expect(loginInput).toHaveValue("test_user");
    expect(passwordInput).toHaveValue("test_password");
  });

  test("Displays error message on failed authorization", async () => {
    mockAuth.mockRejectedValueOnce(
      new Error("Firebase: Error (auth/invalid-credential).")
    );

    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Authorization />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const loginInput = screen.getByPlaceholderText("Логин");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const loginButton = screen.getByText("Войти");

    fireEvent.change(loginInput, { target: { value: "wrong_user" } });
    fireEvent.change(passwordInput, { target: { value: "wrong_password" } });

    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(
      "Ошибка в логине или пароле. Проверьте введенные данные еще раз."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Successfully logs in and redirects", async () => {
    mockAuth.mockResolvedValueOnce({
      _id: "123",
      name: "Test User",
      password: "test_password",
      email: "test@example.com",
      courses: [],
      token: "fake_token",
    });

    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);

    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Authorization />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const loginInput = screen.getByPlaceholderText("Логин");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const loginButton = screen.getByText("Войти");

    fireEvent.change(loginInput, { target: { value: "correct_user" } });
    fireEvent.change(passwordInput, { target: { value: "correct_password" } });

    fireEvent.click(loginButton);

    await screen.findByText("Войти");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
