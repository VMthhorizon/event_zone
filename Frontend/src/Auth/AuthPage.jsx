import { Button } from "react-bootstrap";
import "./AuthPage.css";

function AuthPage() {
  return (
    <>
      <video className="bg-video" autoPlay muted playsInline loop>
        <source src="video-bg.mp4" type="video/mp4"></source>
      </video>
      <div className="d-flex justify-content-center align-items-center gap-3 vh-100">
        <Button className="btn-gradient">Accedi</Button>
        <Button className="btn-gradient">Registrati</Button>
      </div>
    </>
  );
}

export default AuthPage;
