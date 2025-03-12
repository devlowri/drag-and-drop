"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalI {
  open: boolean;
  children: React.ReactNode;
}

const ModalComponent = ({ children }: ModalI) => {
  return (
    <div className="modalWrapper">
      <div className="modal">
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};

const Modal = (props: ModalI) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const BodyElement = document?.body;
  if (props.open) {
    return createPortal(<ModalComponent {...props} />, BodyElement);
  }
  return null;
};

export default Modal;
