import React from "react";
import { Modal, ModalDialog, ModalClose } from "@mui/joy";

const ModalComponent = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="solid" className="modal_div">
        <ModalClose
          onClick={onClose}
          style={{
            backgroundColor: "rgba(40,42,84)",
          }}
        />
        {children}
      </ModalDialog>
    </Modal>
  );
};

export default ModalComponent;
