"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalI {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalComponent = ({ children, onClose }: Omit<ModalI, "open">) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab") {
        handleTabNavigation(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      previouslyFocusedElement.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabNavigation = (event: KeyboardEvent) => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      event.preventDefault();
    }
  };

  return (
    <div className="modalWrapper">
      <div
        ref={modalRef}
        className="modal"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};

const Modal = ({ open, children, onClose }: ModalI) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const BodyElement = document?.body;
  return open
    ? createPortal(
        <ModalComponent onClose={onClose}>{children}</ModalComponent>,
        BodyElement
      )
    : null;
};

export default Modal;
