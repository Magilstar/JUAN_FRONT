import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  function toggleModal() {
    setModal((prevModal) => ({
      ...prevModal,
      isVisible: !prevModal.isVisible,
    }));
  }

  function showModal(message, type = "success") {
    setModal({ isVisible: true, message, type });
  }

  return (
    <ModalContext.Provider value={{ modal, toggleModal, showModal }}>
      {children}
    </ModalContext.Provider>
  );
};
