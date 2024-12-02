import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

interface PdfViewerModalProps {
  pdfUrl: string;
  modalTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  pdfUrl,
  modalTitle = "Visualizador de PDF",
  isOpen,
  onClose,
}) => {

  return (
    <Modal isOpen={isOpen} toggle={()=>onClose()} size="xl" centered>
      <ModalHeader toggle={()=>onClose()}>{modalTitle}</ModalHeader>
      <ModalBody>
        <div
          style={{
            height: "calc(80vh)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default PdfViewerModal;
