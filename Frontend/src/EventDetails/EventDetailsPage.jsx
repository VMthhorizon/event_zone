import { Button, Col, Container, Row } from "react-bootstrap";
import "./EventDetailsPage.css";
import EventCardShowOff from "./EventCardShowOff";
import EventInfo from "./EventInfo";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EventDetailsPage() {
  const navigate = useNavigate();
  return (
    <Container fluid className="mt-3 d-flex flex-column flex-grow-1">
      <Row className="flex-column flex-grow-1 justify-content-between ">
        <Col xs={12}>
          <EventCardShowOff />
        </Col>
        <Col xs={12}>
          <EventInfo />
        </Col>
        <Col xs={12}>
          <Button className="btn-gradient">
            <h6>
              Aggiungi al Carrello <FaCartPlus />
            </h6>
          </Button>
        </Col>
      </Row>
      <Button onClick={() => navigate("/homepage")}>HOME</Button>
    </Container>
  );
}

export default EventDetailsPage;
