import LoginPage from "./index.tsx";
import {
  waitFor,
  cleanup,
  render,
  screen,
  fireEvent,
  getByText,
} from "@testing-library/react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


describe(LoginPage, () => {
  afterEach(cleanup);

  it("Login Page has sign up button", async() => {
    render(
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<div>Register</div>} />
      </Routes>
    , { wrapper: BrowserRouter });
    
    const signupButton = screen.getByRole("button", { name: "Don't Have Account - Signup" });
    await expect(signupButton).toBeInTheDocument();

    fireEvent.click(signupButton);
    const registerPageText = screen.getByText("Register");
    expect(registerPageText).toBeInTheDocument();
    

  });
});
