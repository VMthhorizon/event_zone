import { Button, Col, Container, Row } from "react-bootstrap";
import "./Settings.css";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  return (
    <Container fluid>
      <Row>
        <Col xs={9}>FORZA</Col>
      </Row>
      <Button className="btn-gradient" onClick={() => navigate("/homepage")}>
        HOME
      </Button>
    </Container>
  );
}

export default Settings;
