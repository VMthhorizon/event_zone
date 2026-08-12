import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <div className="video-container">
        <video className="bg-video" muted playsInline loop>
          <source src="video-bg.mp4" type="video/mp4"></source>
        </video>
      </div>
      <Button onClick={() => navigate("/home")}>TEST NOT FOUND</Button>
    </Container>
  );
}

export default AuthPage;
