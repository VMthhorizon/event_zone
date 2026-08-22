import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="flex-column justify-content-center align-items-center"
    >
      <Button onClick={() => navigate("/")} className="btn-gradient mt-3">
        TORNA AL LOGIN
      </Button>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          alert("Logout effettuato con successo");
          navigate("/");
        }}
        className="btn-gradient mt-3"
      >
        Esci dal profilo
      </Button>
    </Container>
  );
}

export default Homepage;
