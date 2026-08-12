import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
  const navigate = useNavigate();
  return (
    <>
      <video className="bg-video" autoPlay muted playsInline loop>
        <source src="video-bg.mp4" type="video/mp4"></source>
      </video>
      <Button onClick={() => navigate("/home")}>TEST NOT FOUND</Button>
    </>
  );
}

export default AuthPage;
