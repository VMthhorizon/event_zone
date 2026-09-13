import { Alert, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { requestOTP, resetPassword } from "../services/authService"; // Import dei nuovi service
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AuthForm({ authMode, setAuthMode }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

  // Stati per il flusso di Reset Password
  const [resetStep, setResetStep] = useState(1);
  const [resetData, setResetData] = useState({
    otp: "",
    newPass: "",
  });

  const [errorMessage, setErroreMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetChange = (e) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroreMessage("");

    try {
      switch (authMode) {
        case "register": {
          await registerUser(formData);
          Swal.fire({
            title: "Utente Registrato!",
            text: "Registrazione avvenuta con successo!",
            icon: "success",
          });
          setFormData({
            username: "",
            nome: "",
            cognome: "",
            email: "",
            password: "",
          });
          setAuthMode("login");
          break;
        }

        case "login": {
          const data = await loginUser({
            email: formData.email,
            password: formData.password,
          });
          Swal.fire({
            title: "Login effettuato!",
            text: "Login avvenuto con successo",
            icon: "success",
          });
          localStorage.setItem("token", data.token);
          navigate("/homepage");
          break;
        }

        case "password": {
          if (resetStep === 1) {
            await requestOTP(formData.email);
            Swal.fire({
              title: "OTP Inviato!",
              text: "Controlla la tua e-mail per il codice di verifica.",
              icon: "info",
            });
            setResetStep(2);
          } else {
            await resetPassword({
              email: formData.email,
              otp: resetData.otp,
              newPass: resetData.newPass,
            });
            Swal.fire({
              title: "Password Aggiornata!",
              text: "Ora puoi effettuare il login con la nuova password.",
              icon: "success",
            });
            // Reset degli stati e ritorno al login
            setResetStep(1);
            setResetData({ otp: "", newPass: "" });
            setAuthMode("login");
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      setErroreMessage(error.message);
    }
  };

  const handleFormTitle = () => {
    switch (authMode) {
      case "login":
        return "LOGIN";
      case "register":
        return "REGISTRAZIONE";
      case "password":
        return resetStep === 1 ? "RECUPERA PASSWORD" : "IMPOSTA NUOVA PASSWORD";
      default:
        return "";
    }
  };

  return (
    <>
      {authMode !== "" && (
        <Card className="card-auth card-form">
          <Form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={handleFormTitle()}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-center mb-4"
              >
                {handleFormTitle()}
              </motion.h1>
            </AnimatePresence>

            {errorMessage && (
              <motion.div
                key="error-alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert
                  variant="danger"
                  onClose={() => setErroreMessage("")}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              </motion.div>
            )}

            <AnimatePresence>
              {authMode === "register" && (
                <motion.div
                  key="register-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Username</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci un username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Nome</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci il tuo nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Cognome</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci il tuo cognome"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(authMode === "login" ||
                authMode === "register" ||
                (authMode === "password" && resetStep === 1)) && (
                <motion.div
                  key="email-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Email</h5>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci la tua email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(authMode === "login" || authMode === "register") && (
                <motion.div
                  key="password-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Form.Group className="mb-5">
                    <Form.Label>
                      <h5>Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci la tua password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {authMode === "password" && resetStep === 2 && (
                <motion.div
                  key="otp-new-password-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <Alert variant="info" className="mb-3">
                    Inserisci il codice OTP inviato a{" "}
                    <strong>{formData.email}</strong>
                  </Alert>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Codice OTP</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci l'OTP a 6 cifre"
                      name="otp"
                      maxLength={6}
                      value={resetData.otp}
                      onChange={handleResetChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>
                      <h5>Nuova Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci la nuova password"
                      name="newPass"
                      value={resetData.newPass}
                      onChange={handleResetChange}
                      required
                    />
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="d-flex align-items-center justify-content-between">
              <Button type="submit" className="btn-gradient w-50">
                <h6>
                  {authMode === "password" && resetStep === 1
                    ? "Ricevi OTP"
                    : "Conferma"}
                </h6>
                <IoSend className="login-register-icons-animation ms-2" />
              </Button>

              {authMode === "login" && (
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setResetStep(1);
                    setAuthMode("password");
                  }}
                  className="text-end ms-3"
                >
                  Password Dimenticata?
                </a>
              )}
            </div>
          </Form>
        </Card>
      )}
    </>
  );
}

export default AuthForm;
