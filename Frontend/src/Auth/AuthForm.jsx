import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoSend } from "react-icons/io5";
import "./AuthForm.css";
import { motion, AnimatePresence } from "framer-motion";

function AuthForm({ authMode, setAuthMode }) {
  return (
    <>
      {authMode !== "" && (
        <Card className="p-3 d-flex mb-4 w-100 card-auth card-form ">
          <Form>
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
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Nome</h5>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci il tuo nome"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h5>Cognome</h5>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Inserisci il tuo cognome"
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
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>
                    <h5>Password</h5>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci la tua password"
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
              <Button className="btn-gradient">
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
