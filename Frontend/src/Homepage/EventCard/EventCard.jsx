import "./EventCard.css";
import { Card, Badge, Container, Row, Col, Button } from "react-bootstrap";
import "../../data/event";
import { EVENTS } from "../../data/event";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { useState } from "react";

function EventCard() {
  // Gestione dei preferiti tramite array in uno stato
  const [favourites, setFavourites] = useState([]);

  // Funzione per aggiornare lo stato ed aggiungere o togliere elementi dall'array dei preferiti al click sul bottone
  const toggleFavourites = (eventId) => {
    setFavourites(
      (prev) =>
        prev.includes(eventId) // Controllo se l'id dell'evento è già nell'array
          ? prev.filter((id) => id !== eventId) // Se è incluso, lo rimuovo
          : [...prev, eventId], // Altrimenti lo aggiugno
    );
  };

  // Gestione del badge sulle card in base al tipo di evento di evento
  const badgeColor = (eventType) => {
    switch (eventType) {
      case "CONCERTO":
        return "danger";
      case "CINEMA":
        return "info";
      case "FESTIVAL":
        return "primary";
      case "TEATRO":
        return "secondary";
      default:
        return "black";
    }
  };

  return (
    <Container className="px-0">
      <Row className="mt-4">
        {EVENTS.map((singleEvent) => (
          <Col xs={12} sm={6} lg={4} xxl={3} key={singleEvent.id_event}>
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
                    bg={badgeColor(singleEvent.event_type)}
                    className="badge-custom"
                  >
                    {singleEvent.event_type}
                  </Badge>
                  <Button
                    variant="light"
                    className="rounded-circle p-0 d-inline-flex align-items-center justify-content-center"
                    style={{ width: "35px", height: "35px" }}
                    onClick={() => toggleFavourites(singleEvent.id_event)} // Applico la funzione dei preferiti al click
                  >
                    {favourites.includes(singleEvent.id_event) ? (
                      <PiHeartFill /> // Se la funzione torna negativa l'icon del cuore sarà vuoto
                    ) : (
                      <PiHeartBold /> // Se la funzione torna positiva l'icon del cuore sarà piena
                    )}
                  </Button>
                </div>

                <div>
                  <small className="event-card-text">
                    {" "}
                    {singleEvent.event_date}
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
