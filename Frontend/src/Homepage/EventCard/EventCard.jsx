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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingCard from "../../LoadingCard/LoadingCard";
import { badgeColor } from "../../helpers/eventUtils";

function EventCard() {
  const navigate = useNavigate();
  // Gestione dei preferiti tramite array in uno stato
  const [favourites, setFavourites] = useState([]);

  const { eventsList, loading, error } = useSelector((state) => state.events);

  // Funzione per aggiornare lo stato ed aggiungere o togliere elementi dall'array dei preferiti al click sul bottone
  const toggleFavourites = (e, eventId) => {
    e.stopPropagation();
    setFavourites(
      (prev) =>
        prev.includes(eventId) // Controllo se l'id dell'evento è già nell'array
          ? prev.filter((id) => id !== eventId) // Se è incluso, lo rimuovo
          : [...prev, eventId], // Altrimenti lo aggiugno
    );
  };

  // Funzione helper per formattare la data senza 'T' e senza secondi
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

  return (
    <Container className="px-0 mt-4">
      {error && <Alert>{error}</Alert>}
      <Row className="mt-4">
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

        {!loading &&
          eventsList.map((singleEvent) => (
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
                className="event-card "
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
                      className={`badge-custom ${badgeColor(singleEvent.eventType)}`}
                    >
                      {singleEvent.eventType}
                    </Badge>
                    <Button
                      variant="light"
                      className="preferiti-icon"
                      onClick={(e) => toggleFavourites(e, singleEvent.eventId)} // Applico la funzione dei preferiti al click
                    >
                      {favourites.includes(singleEvent.eventId) ? (
                        <PiHeartFill className="favourites-heart-icons" /> // Se la funzione torna negativa l'icon del cuore sarà vuoto
                      ) : (
                        <PiHeartBold className="favourites-heart-icons" /> // Se la funzione torna positiva l'icon del cuore sarà piena
                      )}
                    </Button>
                  </div>

                  <div>
                    <small className="event-card-text">
                      {" "}
                      {formatDate(singleEvent.eventDate)}{" "}
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
