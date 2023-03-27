import LoginPage from "./index.tsx";
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


describe(LoginPage, () => {
  afterEach(cleanup);

  it("Login Page has sign up button", () => {
    render(<LoginPage />, { wrapper: BrowserRouter });
    
    const signupButton = screen.getByRole("button", { name: "Don't Have Account - Signup" });
  });
});
