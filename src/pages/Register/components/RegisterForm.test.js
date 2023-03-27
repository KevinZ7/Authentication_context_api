import RegisterForm from "./RegisterForm";
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


describe(RegisterForm, () => {
  afterEach(cleanup);

  it("form displays correct number of inputs(6) and has upload image and Sign Up button", () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getAllByLabelText("Password");
    const emailInput = screen.getByLabelText("Email");
    const firstnameInput = screen.getByLabelText("First name");
    const lastnameInput = screen.getByLabelText("Last name");
    const uploadImage = screen.getByTestId("upload_profile_icon");
    const registerButton = screen.getByRole("button", { name: "Sign Up" });
    

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput[0]).toBeInTheDocument();
    expect(passwordInput[1]).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    
  });

  it("form displays the correct error message when signing in with empty credentials", async () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(signUpButton);
    // eslint-disable-next-line testing-library/prefer-screen-queries

    await waitFor(
      () => {
        const inputErrpr = screen.getAllByTestId("input_error");
        for (let i = 0; i < inputErrpr.length; i++) {
          expect(inputErrpr[i]).toBeInTheDocument();
        }
      },
      { timeout: 500 }
    );
  });

  it("form displays the correct error message when username is less than 5 characters", async () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const usernameInput = screen.getByLabelText("Username");
    const firstNameInput = screen.getByLabelText("First name");

    usernameInput.value = "five";
    usernameInput.dispatchEvent(new Event("input", { bubbles: true }));

    firstNameInput.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const inputError = await waitFor(
      () => {
        return screen.getAllByTestId("input_error");
      },
      { timeout: 500 }
    );

    expect(inputError[0]).toBeInTheDocument();
    expect(inputError[0]).toHaveTextContent("username must be at least 5 characters");
    
  });


});
