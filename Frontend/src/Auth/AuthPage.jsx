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
          <div className="d-flex align-items-center gap-2">
            Accedi <CiLogin className="login-register-icons-animation" />
          </div>
        </Button>
        <Button className="btn-gradient">
          <div className="d-flex align-items-center gap-2">
            Registrati
            <MdAppRegistration className="login-register-icons-animation" />
          </div>
        </Button>
      </Container>
    </>
  );
}

export default AuthPage;
