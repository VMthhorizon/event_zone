import "./EventCard.css";
import { Card, Badge, Container, Row, Col } from "react-bootstrap";
import "../../data/event";
import { EVENTS } from "../../data/event";

function EventCard() {
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
    <Container>
      <Row className="mt-4">
        {EVENTS.map((singleEvent) => (
          <Col xs={12} md={6} lg={4} key={singleEvent.id_event}>
            <Card className="event-card border-0 text-white shadow-lg mb-4">
              <Card.Img
                src={singleEvent.img}
                alt={singleEvent.title}
                className="event-card-img"
              />

              <div className="event-card-overlay"></div>

              <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                <div>
                  <Badge
                    bg={badgeColor(singleEvent.event_type)}
                    className="px-1 py-1 badge-custom"
                  >
                    {singleEvent.event_type}
                  </Badge>
                </div>

                <div>
                  <small className="text-white fw-bold d-block mb-1">
                    {" "}
                    {singleEvent.event_date}
                  </small>
                  <Card.Title className="fw-bold fs-5 mb-1 ">
                    {singleEvent.title}
                  </Card.Title>
                  <div className="d-flex justify-content-between">
                    <Card.Text className="small text-white-50 mb-0">
                      {singleEvent.price}€
                    </Card.Text>
                    <Card.Text className="small text-white-50 mb-0">
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
