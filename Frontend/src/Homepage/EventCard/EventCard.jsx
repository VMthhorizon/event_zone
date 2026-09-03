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
import "../../data/event";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventService";

function EventCard() {
  // Gestione dei preferiti tramite array in uno stato
  const [favourites, setFavourites] = useState([]);
  // Lista degli eventi
  const [eventsList, setEventsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllEvents = async () => {
    try {
      const allEvents = await getAllEvents();

      setEventsList(allEvents);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Funzione per aggiornare lo stato ed aggiungere o togliere elementi dall'array dei preferiti al click sul bottone
  const toggleFavourites = (eventId) => {
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

  // Gestione del badge sulle card in base al tipo di evento di evento
  const badgeColor = (eventType) => {
    switch (eventType) {
      case "CONCERTO":
        return "badge-color-concerto";
      case "CINEMA":
        return "badge-color-cinema";
      case "FESTIVAL":
        return "badge-color-festival";
      case "TEATRO":
        return "badge-color-teatro";
      default:
        return "bg-black";
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllEvents();
  }, []);

  return (
    <Container className="px-0">
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <Row className="mt-4">
        {eventsList.map((singleEvent) => (
          <Col
            xs={12}
            sm={6}
            lg={4}
            xxl={3}
            key={singleEvent.eventId}
            className="gx-3 gy-3"
          >
            <Card className="event-card ">
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
                    onClick={() => toggleFavourites(singleEvent.eventId)} // Applico la funzione dei preferiti al click
                  >
                    {favourites.includes(singleEvent.eventId) ? (
                      <PiHeartFill /> // Se la funzione torna negativa l'icon del cuore sarà vuoto
                    ) : (
                      <PiHeartBold /> // Se la funzione torna positiva l'icon del cuore sarà piena
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
