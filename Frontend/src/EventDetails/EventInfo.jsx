import { Badge, Card } from "react-bootstrap";
import "./EventInfo.css";
import { IoCalendarNumberSharp, IoLocationOutline } from "react-icons/io5";
import { PiMoney } from "react-icons/pi";

function EventInfo() {
  return (
    <Card className="event-info-card bg-gradient">
      <div className="d-flex justify-content-between align-items-center">
        <h2>DETTAGLI EVENTO</h2>
        <Badge className="badge-custom">Categoria</Badge>
      </div>
      <div className="info-wrapper">
        <IoCalendarNumberSharp className="fs-4" />
        <h4>EventDate</h4>
      </div>
      <div className="info-wrapper">
        <IoLocationOutline className="fs-4" />
        <h4>EvenPlace</h4>
      </div>
      <div className="info-wrapper mb-4">
        <PiMoney className="fs-4" />
        <h4>Prezzo</h4>
      </div>
      <h4>Descrizione</h4>
    </Card>
  );
}

export default EventInfo;
