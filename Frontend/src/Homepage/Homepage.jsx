import NavbarHome from "./NavbarHomepage/NavbarHome";
import EventCard from "./EventCard/EventCard";
import { Col, Container, Row } from "react-bootstrap";
import NavbarFilter from "./NavbarFilter/NavbarFilter";

function Homepage() {
  return (
    <div className="flex-column">
      <NavbarHome />
      <Container fluid>
        <Row>
          <Col className="px-0" xs={4} md={3}>
            <NavbarFilter />
          </Col>
          <Col xs={8} md={9}>
            <EventCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
