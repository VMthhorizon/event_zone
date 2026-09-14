import EventCard from "./EventCard/EventCard";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import NavbarFilter from "./NavbarFilter/NavbarFilter";
import "./Homepage.css";

import "./NavbarFilter/NavbarFilter.css";
import EventMap from "./EventMap/EventMap";
import { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";

function Homepage() {
  const [show, setShow] = useState(false);

  return (
    <div className="d-flex flex-column h-100">
      <Container>
        <Offcanvas show={show} onHide={() => setShow(false)}>
          <Offcanvas.Header
            closeButton
            className="bg-primary bg-gradient px-2 py-2"
          >
            <Offcanvas.Title>
              <h3 className="d-flex align-items-center gap-2 text-secondary">
                FILTRI <IoFilterSharp />
              </h3>
              <h6 className="text-white-50">
                Gestisci i filtri per la tua ricerca
              </h6>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body closeButton className="bg-dark p-0">
            <NavbarFilter />
          </Offcanvas.Body>
        </Offcanvas>

        <Row>
          <Col xs={12}>
            <Button onClick={() => setShow(true)} className="btn-gradient mt-3">
              <h5 className="btn-headers">
                Filtri di Ricerca <IoFilterSharp />
              </h5>
            </Button>
            <EventMap />
            <EventCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
