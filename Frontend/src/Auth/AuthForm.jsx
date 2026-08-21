import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { registerUser } from "../services/authService";

function AuthForm({ authMode, setAuthMode }) {
  const [formData, setFormData] = useState({
    username: "",
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });

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

    try {
      if (authMode === "register") {
        const data = await registerUser(formData); // Richiamo il service axios per la registrazione dell'utente

        alert(`Registrazione avvenuta con successo! ID: ${data}`);

        setAuthMode("login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {authMode !== "" && (
        <Card className="p-3 d-flex mb-4 w-100 card-auth card-form ">
          <Form onSubmit={handleSubmit}>
            <AnimatePresence initial={false}>
              {authMode === "register" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <h1 className="text-center mb-4">REGISTRAZIONE</h1>
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
            {(authMode === "login" || authMode === "register") && (
              <>
                {authMode === "login" && (
                  <h1 className="text-center mb-4">LOGIN</h1>
                )}
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
              </>
            )}

            <AnimatePresence initial={false}>
              {authMode === "password" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <h1 className="text-center mb-4">MODIFICA PASSWORD</h1>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Vecchia Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci la tua password corrente"
                    />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>
                      <h5>Nuova Password</h5>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Inserisci la tua nuova password"
                    />
                  </Form.Group>
                </motion.div>
              )}
            </AnimatePresence>

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
                  Recupera la tua password
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
