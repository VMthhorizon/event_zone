import { Button } from "react-bootstrap";
import "./AuthPage.css";
import { CiLogin } from "react-icons/ci";
import { MdAppRegistration } from "react-icons/md";

function AuthPage() {
  return (
    <>
      <video className="bg-video" autoPlay muted playsInline loop>
        <source src="video-bg.mp4" type="video/mp4"></source>
      </video>
      <div className="d-flex justify-content-center align-items-center gap-3 vh-100">
        <Button className="btn-gradient">
          <div className="d-flex align-items-center gap-2">
            Accedi <CiLogin className="login-register-icons-animation" />
          </div>
        </Button>
        <Button className="btn-gradient">
          <div className="d-flex align-items-center gap-2">
            Registrati{" "}
            <MdAppRegistration className="login-register-icons-animation" />
          </div>
        </Button>
      </div>
    </>
  );
}

export default AuthPage;
