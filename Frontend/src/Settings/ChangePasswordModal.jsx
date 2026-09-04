import { useState } from "react";
import { Modal, Form, Button, Alert, InputGroup } from "react-bootstrap";
import "./ChangePasswordModal.css";

function ChangePasswordModal({ show, onHide, onChangePassword }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("La nuova password e la conferma non coincidono.");
      return;
    }

    try {
      setLoading(true);
      if (onChangePassword) {
        await onChangePassword(oldPassword, newPassword);
      }

      setSuccess("Password aggiornata con successo!");
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="card-auth card-form"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="w-100 text-center fw-bold fs-4">
          Cambia Password
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        {error && (
          <Alert variant="danger" className="py-2 text-center small">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="py-2 text-center small">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label className="text-muted small fw-bold">
              Vecchia Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showOldPass ? "text" : "password"}
                placeholder="Inserisci la vecchia password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowOldPass(!showOldPass)}
                tabIndex={-1}
              >
                {showOldPass ? "Nascondi" : "Mostra"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label className="text-muted small fw-bold">
              Nuova Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showNewPass ? "text" : "password"}
                placeholder="Inserisci la nuova password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                tabIndex={-1}
              >
                {showNewPass ? "Nascondi" : "Mostra"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label className="text-muted small fw-bold">
              Conferma Nuova Password
            </Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPass ? "text" : "password"}
                placeholder="Conferma la nuova password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                tabIndex={-1}
              >
                {showConfirmPass ? "Nascondi" : "Mostra"}
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-flex gap-2 pt-2">
            <Button
              variant="secondary"
              className="btn-gradient"
              onClick={handleClose}
              disabled={loading}
            >
              Annulla
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="btn-gradient"
              disabled={loading}
            >
              {loading ? "Salvataggio..." : "Conferma"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePasswordModal;
