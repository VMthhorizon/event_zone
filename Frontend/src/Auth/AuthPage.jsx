import { Button, Container } from "react-bootstrap";
import "./AuthPage.css";
import { CiLogin } from "react-icons/ci";
import { MdAppRegistration } from "react-icons/md";
import AuthForm from "./AuthForm";

function AuthPage() {
  return (
    <>
      <video className="bg-video" autoPlay muted playsInline loop>
        <source src="video-bg.mp4" type="video/mp4"></source>
      </video>
      <Container className="flex-column d-flex justify-content-center align-items-center vh-100">
        <AuthForm />
        <Button className="btn-gradient">
          <h6>Accedi</h6>
          <CiLogin className="login-register-icons-animation" />
        </Button>
        <Button className="btn-gradient">
          <h6>Registrati</h6>
          <MdAppRegistration className="login-register-icons-animation" />
        </Button>
      </Container>
    </>
  );
}

export default AuthPage;
