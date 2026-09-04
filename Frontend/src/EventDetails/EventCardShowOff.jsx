import "./EventCardShowOff.css";
import "../Homepage/EventCard/EventCard.css";
import { Card } from "react-bootstrap";

function EventCardShowOff() {
  return (
    <Card className="rounded-4 event-card-showoff">
      <Card.Img
        // src={singleEvent.img}
        src="/bringme.jpg"
        alt="bringme"
        className="rounded-4 event-card-showoff-img"
        // alt={singleEvent.title}
      />
      <Card.ImgOverlay className="d-flex justify-content-between align-items-end p-3 ">
        <div className="d-flex flex-column">
          <h2 className="card-headers">TITOLO</h2>
          {/* {singleEvent.title} */}
          <h4 className="card-place">PLACE</h4>
          {/* {singleEvent.place} */}
        </div>
        <h3 className="card-headers">
          CIAOOO
          {/* {" "}
          {formatDate(singleEvent.eventDate)}{" "} */}
        </h3>
      </Card.ImgOverlay>
    </Card>
  );
}

export default EventCardShowOff;
