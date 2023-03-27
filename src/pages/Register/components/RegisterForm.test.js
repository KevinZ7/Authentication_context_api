import RegisterForm from "./RegisterForm";
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

describe(RegisterForm, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("form displays correct number of inputs(6) and has upload image and Sign Up button", () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    const emailInput = screen.getByLabelText("Email");
    const firstnameInput = screen.getByLabelText("First name");
    const lastnameInput = screen.getByLabelText("Last name");
    const uploadImage = screen.getByTestId("upload_profile_icon");
    const registerButton = screen.getByRole("button", { name: "Sign Up" });

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstnameInput).toBeInTheDocument();
    expect(lastnameInput).toBeInTheDocument();
    expect(uploadImage).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("form displays the correct error message when signing in with empty credentials", async () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(signUpButton);

    const usernameError = await waitFor(
      () => {
        return screen.getByTestId("username_error");
      },
      { timeout: 200 }
    );

    const passwordError = await waitFor(
      () => {
        return screen.getByTestId("password_error");
      },
      { timeout: 200 }
    );

    const confirmPasswordError = await waitFor(
      () => {
        return screen.getByTestId("confirm_password_error");
      },
      { timeout: 200 }
    );

    const emailError = await waitFor(
      () => {
        return screen.getByTestId("email_error");
      },
      { timeout: 200 }
    );

    const firstNameError = await waitFor(
      () => {
        return screen.getByTestId("first_name_error");
      },
      { timeout: 200 }
    );

    const lastNameError = await waitFor(
      () => {
        return screen.getByTestId("last_name_error");
      },
      { timeout: 200 }
    );

    expect(usernameError).toHaveTextContent("Required");
    expect(passwordError).toHaveTextContent("Required");
    expect(confirmPasswordError).toHaveTextContent("Required");
    expect(emailError).toHaveTextContent("Required");
    expect(firstNameError).toHaveTextContent("Required");
    expect(lastNameError).toHaveTextContent("Required");
  });

  it("form displays the correct error message when username is less than 5 characters", async () => {
    render(<RegisterForm />, { wrapper: BrowserRouter });
    const usernameInput = screen.getByLabelText("Username");
    const firstNameInput = screen.getByLabelText("First name");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    const emailInput = screen.getByLabelText("Email");
    const lastNameInput = screen.getByLabelText("Last name");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(usernameInput, { target: { value: "bad" } });
    fireEvent.change(firstNameInput, { target: { value: "kevin" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });
    fireEvent.change(emailInput, { target: { value: "invalid" } });
    fireEvent.change(lastNameInput, { target: { value: "zhou" } });

    fireEvent.click(signUpButton);

    const usernameError = await waitFor(
      () => {
        return screen.getByTestId("username_error");
      },
      { timeout: 200 }
    );

    const passwordError = await waitFor(
      () => {
        return screen.getByTestId("password_error");
      },
      { timeout: 200 }
    );

    const confirmPasswordError = await waitFor(
      () => {
        return screen.getByTestId("confirm_password_error");
      },
      { timeout: 200 }
    );

    const emailError = await waitFor(
      () => {
        return screen.getByTestId("email_error");
      },
      { timeout: 200 }
    );

    expect(usernameError).toHaveTextContent(
      "username must be at least 5 characters"
    );
    expect(passwordError).toHaveTextContent(
      "password must be at least 5 characters"
    );
    expect(confirmPasswordError).toHaveTextContent("Passwords must match");
    expect(emailError).toHaveTextContent("Please enter a valid email");
  });

  it("On successful submit form redirects to userlist page", async () => {
    axios.post.mockImplementationOnce(() => {
      Promise.resolve({
        data: {
          status: "success",
        },
        status: 200
      });
    });

    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({ 
        data: {
          access: "fake",
          refresh: "fake",
        },
        "status": 200
      });
    });

    render(
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/userlist" element={<div>userlist</div>} />
      </Routes>,
      { wrapper: BrowserRouter }
    );

    const usernameInput = screen.getByLabelText("Username");
    const firstNameInput = screen.getByLabelText("First name");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm password");
    const emailInput = screen.getByLabelText("Email");
    const lastNameInput = screen.getByLabelText("Last name");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(usernameInput, { target: { value: "testkevin" } });
    fireEvent.change(firstNameInput, { target: { value: "kevin" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });
    fireEvent.change(emailInput, { target: { value: "kevintest@gg.ca" } });
    fireEvent.change(lastNameInput, { target: { value: "zhou" } });

    fireEvent.click(signUpButton);

    const userlist = await waitFor(() => {
      return screen.getByText("userlist");
    });

    expect(userlist).toBeInTheDocument();


  });
});
