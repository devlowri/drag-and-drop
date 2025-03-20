import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Modal from "../Modal";

describe("Modal Component", () => {
  test("Modal is not rendered if 'open' is false", () => {
    render(
      <Modal open={false} onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
  });

  test("Modal is rendered if 'open' is true", () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  test("Modal is closed when Escape key is pressed", () => {
    const handleClose = jest.fn();

    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("The modal keeps the focus inside the modal and Tab key navigates between focusable elements", async () => {
    render(
      <Modal open={true} onClose={jest.fn()}>
        <button>Button 1</button>
        <button>Button 2</button>
      </Modal>
    );

    const button1 = screen.getByText("Button 1");
    const button2 = screen.getByText("Button 2");

    button1.focus();
    expect(document.activeElement).toBe(button1);

    await userEvent.tab();
    expect(document.activeElement).toBe(button2);

    await userEvent.tab();
    expect(document.activeElement).toBe(button1);

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(button2);
  });

  test("Escape key fires onClose properly", () => {
    const handleClose = jest.fn();

    render(
      <Modal open={true} onClose={handleClose}>
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(handleClose).toHaveBeenCalled();
  });
});
