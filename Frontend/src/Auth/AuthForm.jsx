import { Alert, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function AuthForm({ authMode, setAuthMode }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErroreMessage] = useState("");

  // Gestisco l'input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit del form di registrazione
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroreMessage("");

    try {
      // Gestione delle chiamate API tramite switch case basato sullo stato di AuthMode (register/login/password)

      switch (authMode) {
        // REGISTRAZIONE UTENTE
        case "register": {
          const data = await registerUser(formData); // Richiamo il service axios per la REGISTRAZIONE dell'utente

          alert(`Registrazione avvenuta con successo! ID: ${data}`);

          console.log(data);

          setAuthMode("login");

          break;
        }

        case "login": {
          const data = await loginUser({
            email: formData.email,
            password: formData.password,
          });

          alert("Login avvenuto con successo");

          localStorage.setItem("token", data.token);
          navigate("/homepage");

          break;
        }

        default:
          break;
      }
    } catch (error) {
      setErroreMessage(error.message);
    }
  };

  // Funzione per gestire dinamicamente il titolo del form in base all'authmode
  const handleFormTitle = () => {
    switch (authMode) {
      case "login":
        return "LOGIN";

      case "register":
        return "REGISTRAZIONE";

      case "password":
        return "RECUPERA PASSWORD";

      default:
        return "";
    }
  };

  return (
    <>
      {authMode !== "" && (
        <Card className="p-3 d-flex mb-4 w-100 card-auth card-form ">
          <Form onSubmit={handleSubmit}>
            <AnimatePresence initial={false}>
              <h1 className="text-center mb-4">{handleFormTitle()}</h1>
              {errorMessage && (
                <Alert
                  variant="danger"
                  onClose={() => setErroreMessage("")}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
              {authMode === "register" && (
                <motion.div
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

            {(authMode === "login" || authMode === "register") && (
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
            )}

            <div className="d-flex align-items-center ">
              <Button type="submit" className="btn-gradient">
                <h6>Conferma</h6>
                <IoSend className="login-register-icons-animation" />
              </Button>
              {authMode === "login" && (
                <a
                  onClick={(e) => {
                    e.preventDefault;
                    setAuthMode("password");
                  }}
                  className="text-end w-100"
                >
                  Password dimenticata
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
