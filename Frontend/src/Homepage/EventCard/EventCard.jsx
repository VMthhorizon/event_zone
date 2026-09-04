import "./EventCard.css";
import {
  Card,
  Badge,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../../LoadingCard/LoadingCard";
import { badgeColor } from "../../helpers/eventUtils";
import { fetchAllEvents } from "../../Redux/Slices/eventSlice";

function EventCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("user_favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Lettura dello stato globale di Redux inclusi i filtri laterali
  const {
    eventsList,
    loading,
    error,
    searchTerm,
    selectedCategory,
    maxPrice,
    selectedDate,
  } = useSelector((state) => state.events);

  // Scarica tutti gli eventi dal backend una sola volta all'avvio
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("user_favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourites = (e, eventId) => {
    e.stopPropagation();
    setFavourites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filtraggio dinamico lato client
  const filteredEvents = eventsList.filter((singleEvent) => {
    // 1. Controllo ricerca testuale (su titolo o luogo)
    const matchesSearch =
      !searchTerm ||
      singleEvent.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      singleEvent.place?.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Controllo categoria
    const eventCategory = singleEvent.eventType || singleEvent.category || "";
    const matchesCategory =
      selectedCategory === "tutti" ||
      eventCategory.toLowerCase() === selectedCategory.toLowerCase();

    // 3. Controllo budget massimo (se 300 include tutti gli eventi)
    const matchesPrice =
      maxPrice === 300 || Number(singleEvent.price) <= Number(maxPrice);

    // 4. Controllo data (confronta la stringa YYYY-MM-DD dell'input con la data dell'evento)
    const matchesDate =
      !selectedDate ||
      (singleEvent.eventDate && singleEvent.eventDate.startsWith(selectedDate));

    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  });

  return (
    <Container className="px-0">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xxl={3}
              key={index}
              className="gx-3 gy-3"
            >
              <LoadingCard />
            </Col>
          ))}

        {!loading && filteredEvents.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <h5>Nessun evento trovato per i filtri selezionati.</h5>
          </Col>
        )}

        {!loading &&
          filteredEvents.map((singleEvent) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xxl={3}
              key={singleEvent.eventId}
              className="gx-3 gy-3"
            >
              <Card
                onClick={() => navigate(`/eventDetails/${singleEvent.eventId}`)}
                className="event-card"
              >
                <Card.Img
                  src={singleEvent.img}
                  alt={singleEvent.title}
                  className="event-card-img"
                />

                <div className="event-card-overlay"></div>

                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge
                      className={`badge-custom ${badgeColor(
                        singleEvent.eventType,
                      )}`}
                    >
                      {singleEvent.eventType}
                    </Badge>
                    <Button
                      variant="light"
                      className="preferiti-icon"
                      onClick={(e) => toggleFavourites(e, singleEvent.eventId)}
                    >
                      {favourites.includes(singleEvent.eventId) ? (
                        <PiHeartFill className="favourites-heart-icons" />
                      ) : (
                        <PiHeartBold className="favourites-heart-icons" />
                      )}
                    </Button>
                  </div>

                  <div>
                    <small className="event-card-text">
                      {formatDate(singleEvent.eventDate)}
                    </small>
                    <Card.Title className="event-card-title">
                      {singleEvent.title}
                    </Card.Title>
                    <div className="d-flex justify-content-between">
                      <Card.Text className="event-card-info">
                        {singleEvent.price}€
                      </Card.Text>
                      <Card.Text className="event-card-info">
                        {singleEvent.place}
                      </Card.Text>
                    </div>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default EventCard;
