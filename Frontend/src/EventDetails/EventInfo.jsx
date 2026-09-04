import { Badge, Card } from "react-bootstrap";
import "./EventInfo.css";
import { IoCalendarNumberSharp, IoLocationOutline } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";
import { LuEuro } from "react-icons/lu";
import "../Homepage/EventCard/EventCard.css";
import { badgeColor } from "../helpers/eventUtils";

function EventInfo(props) {
  return (
    <Card className="event-info-card bg-gradient">
      <div className="d-flex justify-content-between align-items-center">
        <h2>DETTAGLI EVENTO</h2>
        <Badge
          className={`badge-custom fs-4 ${badgeColor(props.foundEvent.eventType)}`}
        >
          {props.foundEvent.eventType}
        </Badge>{" "}
      </div>
      <div className="info-wrapper">
        <IoCalendarNumberSharp className="fs-4" />
        <h4>{props.foundEvent.title}</h4>
      </div>
      <div className="info-wrapper">
        <IoLocationOutline className="fs-4" />
        <h4>{props.foundEvent.place}</h4>
      </div>
      <div className="info-wrapper mb-4">
        <PiMoney className="fs-4" />
        <h4>
          {props.foundEvent.price} <LuEuro />
        </h4>
      </div>
      <div className="info-wrapper mb-4 flex-column">
        <h3>DESCRIZIONE</h3>
        <h4>{props.foundEvent.description}</h4>
      </div>
    </Card>
  );
}

export default EventInfo;
