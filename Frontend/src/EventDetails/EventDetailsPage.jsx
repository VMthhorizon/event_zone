import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import "./EventDetailsPage.css";
import EventCardShowOff from "./EventCardShowOff";
import EventInfo from "./EventInfo";
import { FaCartPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventById } from "../services/eventService";
import { useEffect, useState } from "react";
import LoadingCard from "../LoadingCard/LoadingCard";
import { addToCart } from "../Redux/Slices/cartSlice";

function EventDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { eventsList } = useSelector((state) => state.events);
  const clickedEvent = eventsList?.find(
    (e) => String(e.id || e.eventId) === String(id),
  );

  const [event, setEvent] = useState(clickedEvent || null);
  const [loading, setLoading] = useState(!clickedEvent);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se l'evento era già in Redux, lo imposti e chiudi il loading
    if (clickedEvent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEvent(clickedEvent);
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEventById(id);

        setEvent(data);
      } catch (err) {
        setError(err.message || "Evento non trovato");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, clickedEvent]);

  if (loading) {
    return (
      <Container fluid className="mt-3">
        <div className="d-flex flex-column gap-3 w-100">
          <LoadingCard className="w-100" />
          <LoadingCard className="w-100" />
          <LoadingCard className="w-100" />
        </div>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="text-center mt-5 text-white">
        <Alert variant="danger">{error || "Evento non trovato"}</Alert>
        <Button
          className="btn-gradient mt-3"
          onClick={() => navigate("/homepage")}
        >
          Torna alla Homepage
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-3 d-flex flex-column flex-grow-1">
      <Row className="flex-column flex-grow-1 justify-content-between gap-3">
        <Col xs={12}>
          <EventCardShowOff foundEvent={event} />
        </Col>
        <Col xs={12}>
          <EventInfo foundEvent={event} />
        </Col>
        <Col xs={12}>
          <Button
            className="btn-gradient w-100"
            onClick={() => dispatch(addToCart(event))}
          >
            <h6 className="mb-0">
              Aggiungi al Carrello <FaCartPlus className="ms-1" />
            </h6>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EventDetailsPage;
