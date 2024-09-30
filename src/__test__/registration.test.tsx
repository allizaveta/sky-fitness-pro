import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Registration } from "../component/popups/registration"; // Обновите путь к компоненту
import ReduxProvider from "../store/reduxProvider";
import { MemoryRouter } from "react-router-dom";
import { AuthorizationProvider } from "../context/AuthorizationContext";

jest.mock("../api", () => ({
  register: jest.fn(),
}));

const mockRegister = require("../api").register;

describe("Registration Component", () => {
  beforeEach(() => {
    mockRegister.mockReset();
  });

  test("Renders the Registration component", () => {
    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Registration />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    expect(screen.getByPlaceholderText("Имя")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Эл. почта")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Пароль")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Повторите пароль")).toBeInTheDocument();
    expect(screen.getByText("Зарегистрироваться")).toBeInTheDocument();
    expect(screen.getByText("Войти")).toBeInTheDocument();
  });

  test("Allows user to input registration data", () => {
    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Registration />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const nameInput = screen.getByPlaceholderText("Имя");
    const emailInput = screen.getByPlaceholderText("Эл. почта");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const passwordAgainInput = screen.getByPlaceholderText("Повторите пароль");

    fireEvent.change(nameInput, { target: { value: "test_user" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test_password" } });
    fireEvent.change(passwordAgainInput, {
      target: { value: "test_password" },
    });

    expect(nameInput).toHaveValue("test_user");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("test_password");
    expect(passwordAgainInput).toHaveValue("test_password");
  });

  test("Displays error message when passwords do not match", () => {
    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Registration />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const passwordInput = screen.getByPlaceholderText("Пароль");
    const passwordAgainInput = screen.getByPlaceholderText("Повторите пароль");
    const registerButton = screen.getByText("Зарегистрироваться");

    fireEvent.change(passwordInput, { target: { value: "test_password" } });
    fireEvent.change(passwordAgainInput, {
      target: { value: "different_password" },
    });

    fireEvent.click(registerButton);

    const errorMessage = screen.getByText("Пароли не совпадают");
    expect(errorMessage).toBeInTheDocument();
  });

  test("Displays error message on failed registration", async () => {
    mockRegister.mockRejectedValueOnce(
      new Error("Firebase: Error (auth/email-already-in-use).")
    );

    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Registration />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const nameInput = screen.getByPlaceholderText("Имя");
    const emailInput = screen.getByPlaceholderText("Эл. почта");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const passwordAgainInput = screen.getByPlaceholderText("Повторите пароль");
    const registerButton = screen.getByText("Зарегистрироваться");

    fireEvent.change(nameInput, { target: { value: "test_user" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test_password" } });
    fireEvent.change(passwordAgainInput, {
      target: { value: "test_password" },
    });

    fireEvent.click(registerButton);

    const errorMessage = await screen.findByText(
      "Данная почта уже используется. Попробуйте войти"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("Successfully registers and closes modal", async () => {
    mockRegister.mockResolvedValueOnce({
      _id: "123",
      name: "Test User",
      email: "test@example.com",
      token: "fake_token",
    });

    const mockOpenModal = jest.fn();
    const mockCloseRegistrationModal = jest.fn();

    jest
      .spyOn(
        require("../context/AuthorizationContext"),
        "useAuthorizationModal"
      )
      .mockReturnValue({
        openModal: mockOpenModal,
        closeRegistrationModal: mockCloseRegistrationModal,
      });

    render(
      <ReduxProvider>
        <MemoryRouter>
          <AuthorizationProvider>
            <Registration />
          </AuthorizationProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    const nameInput = screen.getByPlaceholderText("Имя");
    const emailInput = screen.getByPlaceholderText("Эл. почта");
    const passwordInput = screen.getByPlaceholderText("Пароль");
    const passwordAgainInput = screen.getByPlaceholderText("Повторите пароль");
    const registerButton = screen.getByText("Зарегистрироваться");

    fireEvent.change(nameInput, { target: { value: "test_user" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test_password" } });
    fireEvent.change(passwordAgainInput, {
      target: { value: "test_password" },
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockOpenModal).toHaveBeenCalled();
      expect(mockCloseRegistrationModal).toHaveBeenCalled();
    });
  });
});
