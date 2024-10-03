import { render } from "@testing-library/react";
import Root from "./root.component"; // Adjust the path if needed

describe("Root component", () => {
  it("should render 'Welcome to the Home Page' on the / route", () => {
    const { getByText } = render(<Root />); // Just render Root component

    // Expect the text "Welcome to the Home Page" to be in the document
    expect(getByText(/Welcome to the Home Page/i)).toBeInTheDocument();
  });
});
