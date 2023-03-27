import UserListPage from "./";
import {
  waitFor,
  cleanup,
  render,
  screen,
  fireEvent,
  getByTestId,
} from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

describe(UserListPage, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("Contains logout button and correct header", () => {
    render(<UserListPage />, { wrapper: BrowserRouter });

    const logoutButton = screen.getByRole("button", { name: "logout" });
    const header = screen.getByText("Users List");
    expect(logoutButton).toBeInTheDocument();
    expect(header).toBeInTheDocument();
  });

  // it("Calls correct api on load", async () => {
  //   useAxiosPrivate.mockReturnValueOnce({
  //     get: jest.fn(() => {
  //       console.log("mock get user list");
  //       return Promise.resolve({
  //         data: [
  //           {
  //             id: 1,
  //             username: "test",
  //             email: "test",
  //             first_name: "test",
  //             last_name: "test",
  //             profile_icon: "test.png",
  //           },
  //         ],
  //       });
  //     }),
  //   });

  //   render(<UserListPage />, { wrapper: BrowserRouter });

  //   await waitFor(() => {
  //     expect(screen.getByText("test")).toBeInTheDocument();
  //   });
  // });


});
