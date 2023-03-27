import LoginForm from "./LoginForm";
import {
  waitFor,
  cleanup,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


describe(LoginForm, () => {
  afterEach(cleanup);

  it("form displays correct number of inputs (2)", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("form contains the login button", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeInTheDocument();
  });

  it("from displays the correct error message when loggin in with empty credentials", async () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);
    // eslint-disable-next-line testing-library/prefer-screen-queries

    await waitFor(
      () => {
        const usernameError = screen.getByTestId("username_error");
        expect(usernameError).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    await waitFor(
      () => {
        const passwordError = screen.getByTestId("password_error");
        expect(passwordError).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });

  it("loggin in with the wrong credentials provide the correct error message", async () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "wrongUsername" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(loginButton);

    await waitFor(
      () => {
        const loginFailedMsg = screen.getByTestId("login_error");
      },
      {
        timeout: 2000,
      }
    );
  });

  it("Loggin in with the correct credentials redirects to the userlist page", async () => {

    render(<Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/userlist" element={<div>userlist</div>} />
      </Routes>, { wrapper: BrowserRouter });

    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "kevinz2@gg.ca" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const userListPage = screen.getByText("userlist");
      expect(userListPage).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
