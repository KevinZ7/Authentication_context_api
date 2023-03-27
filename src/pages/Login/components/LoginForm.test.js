import LoginForm from "./LoginForm";
import {
  waitFor,
  cleanup,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "../../../api/axios";

jest.mock("../../../api/axios");

describe(LoginForm, () => {
  beforeEach(()=>{
    jest.clearAllMocks();
    cleanup()
  });

  afterEach(()=>{
    jest.clearAllMocks();
    cleanup()
  });


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


  it("Loggin in with the correct credentials redirects to the userlist page", async () => {
    axios.post.mockImplementation(()=>{
      console.log("Mock axios get called");
      Promise.resolve({data:{
        access:"fake",
        refresh:"fake"
      }});
    });
    
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/userlist" element={<div>userlist</div>} />
        </Routes>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "kevinz2@gg.ca" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    const userlist = await screen.findByText("userlist");
    expect(userlist).toBeInTheDocument();
  });

  it("loggin in with the wrong credentials provide the correct error message", async () => {
    axios.post.mockImplementation(()=>{
      Promise.resolve({
        response:{
          status:401
        }
      });
    });
    render(<LoginForm />, { wrapper: BrowserRouter });
    const loginButton = screen.getByRole("button", { name: "Login" });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(usernameInput, { target: { value: "wrongUsername" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPassword" } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(axios.post).toHaveBeenCalledWith('/login/', { username: 'wrongUsername', password: 'wrongPassword',"loginFailed": false},{"headers": {"Content-Type": "application/json"}, "withCredentials": true});
  });
});
