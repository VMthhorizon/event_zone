import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>404 Pagina non trovata</h1>
      <Button onClick={() => navigate("/")}>HOME</Button>
    </Container>
  );
}

export default NotFound;
