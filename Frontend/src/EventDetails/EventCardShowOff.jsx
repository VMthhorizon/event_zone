import "./EventCardShowOff.css";
import "../Homepage/EventCard/EventCard.css";
import { Card } from "react-bootstrap";

function EventCardShowOff(props) {
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
    <Card className="rounded-4 event-card-showoff">
      <Card.Img
        src={props.foundEvent.img}
        className="rounded-4 event-card-showoff-img"
        alt={props.foundEvent.title}
      />
      <Card.ImgOverlay className="d-flex justify-content-between align-items-end p-3 ">
        <div className="d-flex flex-column">
          <h2 className="card-headers"> {props.foundEvent.title}</h2>
          <h4 className="card-place"> {props.foundEvent.place}</h4>
        </div>
        <h2 className="card-headers">
          {formatDate(props.foundEvent.eventDate).slice(0, 10)};
        </h2>
      </Card.ImgOverlay>
    </Card>
  );
}

export default EventCardShowOff;
