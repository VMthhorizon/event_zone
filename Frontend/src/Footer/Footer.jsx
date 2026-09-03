import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <Container fluid className=" bg-dark py-2 ">
      <Row className="align-items-start ">
        <Col xs={12} md={6} className="mb-3">
          <h3 className="mb-1 text-secondary">EventZone</h3>
          <h6 className="mb-1 text-info">
            Il tuo punto di riferimento per il tuo intrattenimento. Vivi lo
            spettacolo, al resto ci pensiamo noi{" "}
          </h6>
        </Col>
        <Col xs={12} md={6}>
          <h3 className="mb-1 text-light">Copyright</h3>
          <h6 className="text-white-50 mt-2">
            © 2026 [EventZone]. Tutti i diritti riservati.
          </h6>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
