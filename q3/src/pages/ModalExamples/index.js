import { useState } from "react";
import Modal from "src/components/CustomModal";
import Button from "src/components/CustomButton";
import "./Modal.css";

const ModalExamples = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!");
    setFormModalOpen(false);
  };

  const handleConfirm = () => {
    alert("Action confirmed!");
    setConfirmModalOpen(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Modal Component Examples</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Button variant="primary" onClick={() => setBasicModalOpen(true)}>
          Open Basic Modal
        </Button>

        <Button variant="success" onClick={() => setConfirmModalOpen(true)}>
          Open Confirmation Modal
        </Button>

        <Button variant="secondary" onClick={() => setFormModalOpen(true)}>
          Open Form Modal
        </Button>

        <Button variant="primary" onClick={() => setCustomModalOpen(true)}>
          Open Custom Modal
        </Button>
      </div>

      {/* Basic Modal Example */}
      <Modal isOpen={basicModalOpen} onClose={() => setBasicModalOpen(false)}>
        <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "10px" }}>
          This is the modal title
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          This is the modal description. You can put any content here.
        </p>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button variant="success" onClick={() => setBasicModalOpen(false)}>
            Submit
          </Button>
          <Button variant="danger" onClick={() => setBasicModalOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Confirmation Modal Example */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
      >
        <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "10px" }}>
          Confirm Action
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          Are you sure you want to perform this action? This cannot be undone.
        </p>
        <div
          style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
        >
          <Button
            variant="secondary"
            onClick={() => setConfirmModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Modal>

      {/* Form Modal Example */}
      <Modal isOpen={formModalOpen} onClose={() => setFormModalOpen(false)}>
        <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "20px" }}>
          Contact Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>
            <input
              type="text"
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email"
              required
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Message:
            </label>
            <textarea
              required
              rows="4"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </div>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => setFormModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </div>
        </form>
      </Modal>

      {/* Custom Modal (no close button, no backdrop close) */}
      <Modal
        isOpen={customModalOpen}
        onClose={() => setCustomModalOpen(false)}
        showCloseButton={false}
        closeOnBackdrop={false}
      >
        <h2 id="modal-title" style={{ marginTop: 0, marginBottom: "10px" }}>
          Custom Modal
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          This modal has no close button and doesn't close when clicking the
          backdrop. You must use the button below or press Escape to close it.
        </p>
        <div style={{ textAlign: "center" }}>
          <Button variant="primary" onClick={() => setCustomModalOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalExamples;
