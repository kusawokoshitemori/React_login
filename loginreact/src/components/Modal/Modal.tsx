import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ closeModal, children }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-8 rounded shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
