import EventCard from "./EventCard/EventCard";
import { Col, Container, Row } from "react-bootstrap";
import NavbarFilter from "./NavbarFilter/NavbarFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllEvents } from "../Redux/Slices/eventSlice";
import "./NavbarFilter/NavbarFilter.css";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <Container fluid>
        <Row>
          <Col className="px-0 navbar-filter" xs={4} md={3}>
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
