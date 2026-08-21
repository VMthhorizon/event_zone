import { Button, Col, Container, Row } from "react-bootstrap";
import "./AuthPage.css";
import { CiLogin } from "react-icons/ci";
import { MdAppRegistration } from "react-icons/md";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AuthPage() {
  const [authMode, setAuthMode] = useState("");

  return (
    <>
      <video className="bg-video" autoPlay muted playsInline loop>
        <source src="video-bg.mp4" type="video/mp4"></source>
      </video>
      <Container className="flex-column d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100 justify-content-center align-items-center">
          <Col xs={12} md={9} lg={6}>
            <AuthForm authMode={authMode} setAuthMode={setAuthMode} />

            <Col className="d-flex gap-1">
              <AnimatePresence>
                {authMode !== "login" && (
                  <motion.div
                    key="btn-login"
                    layout
                    style={{ flex: 1, width: 0 }}
                    initial={{ opacity: 0, flex: 0 }}
                    animate={{ opacity: 1, flex: 1 }}
                    exit={{ opacity: 0, flex: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Button
                      onClick={() => {
                        setAuthMode("login");
                      }}
                      className="btn-gradient btn-auth "
                    >
                      <h6>Accedi</h6>
                      <CiLogin className="login-register-icons-animation" />
                    </Button>
                  </motion.div>
                )}
                {authMode !== "register" && (
                  <motion.div
                    key="btn-register"
                    layout
                    style={{ flex: 1, width: 0 }}
                    initial={{ opacity: 0, flex: 0 }}
                    animate={{ opacity: 1, flex: 1 }}
                    exit={{ opacity: 0, flex: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Button
                      onClick={() => {
                        setAuthMode("register");
                      }}
                      className="btn-gradient btn-auth "
                    >
                      <h6>Registrati</h6>
                      <MdAppRegistration className="login-register-icons-animation" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AuthPage;
