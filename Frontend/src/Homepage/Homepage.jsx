import NavbarHome from "./NavbarHomepage/NavbarHome";
import EventCard from "./EventCard/EventCard";
import { Col, Container, Row } from "react-bootstrap";
import NavbarFilter from "./NavbarFilter/NavbarFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllEvents } from "../Redux/Slices/eventSlice";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
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
