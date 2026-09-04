import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
} from "react-bootstrap";
import "./DashboardOrganizer.css";
import { useRef, useState } from "react";
import { createEvent, uploadImage } from "../services/eventService";
import Swal from "sweetalert2";

const EVENT_TYPES = ["CONCERTO", "CINEMA", "FESTIVAL", "TEATRO"];

function DashboardOrganizer() {
  // Riferimento all'input file DOM
  const fileInputRef = useRef(null);

  const [eventForm, setEventForm] = useState({
    eventType: EVENT_TYPES[0],
    title: "",
    description: "",
    place: "",
    eventDate: "",
    totalSeats: "",
    price: "",
    longitude: "",
    latitude: "",
    img: "",
  });

  const [selectedImage, setselectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Gestore per l'input dell'img
  const handleUploadImg = (e) => {
    if (e.target.files && e.target.files[0]) {
      setselectedImage(e.target.files[0]); // Memorizza il file binario
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEventForm = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setErrorMessage("Seleziona un immagine per l'evento");
      return;
    }

    setLoading(true);

    try {
      const imgResponse = await uploadImage(selectedImage);

      const eventPayload = {
        ...eventForm,
        totalSeats: parseInt(eventForm.totalSeats),
        price: parseFloat(eventForm.price),
        latitude: parseFloat(eventForm.latitude),
        longitude: parseFloat(eventForm.longitude),
        img: imgResponse.imgUrl,
      };

      await createEvent(eventPayload);

      Swal.fire({
        title: "Evento Creato!",
        text: "L'Evento è stato creato con successo",
        icon: "success",
      });

      setselectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Svuota fisicamente il campo file nel DOM
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center mt-3">
        <Col xs={12} md={9}>
          <Form
            onSubmit={submitEventForm}
            className="card-form card-auth organizer-form"
          >
            <h3 className="text-start text-primary">CREA UN EVENTO</h3>
            {errorMessage && (
              <Alert
                variant="danger"
                onClose={() => setErrorMessage("")}
                dismissible
              >
                {errorMessage}
              </Alert>
            )}
            <FormGroup className="flex-column w-100" controlId="eventType">
              <FormLabel className="fs-4">
                {" "}
                <h5>CATEGORIA EVENTO</h5>
              </FormLabel>
              <FormSelect
                name="eventType"
                value={eventForm.eventType}
                onChange={handleFormChange}
                required
              >
                {EVENT_TYPES.map((eventType) => (
                  <option key={eventType} value={eventType}>
                    {eventType}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="title">
              <FormLabel className="fs-4">
                <h5>TITOLO</h5>
              </FormLabel>
              <Form.Control
                placeholder="Inserisci il titolo dell'evento"
                name="title"
                value={eventForm.title}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="description">
              <FormLabel className="fs-4">
                <h5>DESCRIZIONE EVENTO</h5>
              </FormLabel>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Descrivi l'evento"
                name="description"
                value={eventForm.description}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="place">
              <FormLabel className="fs-4">
                <h5>LUOGO</h5>
              </FormLabel>
              <Form.Control
                placeholder="Inserisci la città dell'evento"
                name="place"
                value={eventForm.place}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="eventDate">
              <FormLabel className="fs-4">
                <h5>DATA e ORA EVENTO</h5>
              </FormLabel>
              <Form.Control
                type="datetime-local"
                placeholder="Inserisci la data e l'ora dell'evento"
                name="eventDate"
                value={eventForm.eventDate}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="totalSeats">
              <FormLabel className="fs-4">
                <h5>CAPIENZA EVENTO</h5>
              </FormLabel>
              <Form.Control
                type="number"
                min="1"
                placeholder="Es. 100"
                name="totalSeats"
                value={eventForm.totalSeats}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="price">
              <FormLabel className="fs-4">
                <h5>PREZZO</h5>
              </FormLabel>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                placeholder="Es. 12.50"
                name="price"
                value={eventForm.price}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="longitude">
              <FormLabel className="fs-4">
                <h5>LONGITUDINE</h5>
              </FormLabel>
              <Form.Control
                type="number"
                step="any"
                placeholder="Es. 12.4963655"
                name="longitude"
                value={eventForm.longitude}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="latitude">
              <FormLabel className="fs-4">
                <h5>LATITUDINE</h5>
              </FormLabel>
              <Form.Control
                placeholder="Es. 12.4963655"
                name="latitude"
                value={eventForm.latitude}
                onChange={handleFormChange}
                required
              ></Form.Control>
            </FormGroup>
            <FormGroup className="flex-column w-100" controlId="img">
              <FormLabel className="fs-4">
                <h5>IMMAGINE</h5>
              </FormLabel>
              <Form.Control
                ref={fileInputRef}
                type="file"
                accept="image/*"
                placeholder="Inserisci l'immagine per rappresentare l'evento"
                name="img"
                onChange={handleUploadImg}
                required
              ></Form.Control>
            </FormGroup>
            <Button type="submit" className="btn-gradient" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  INVIO IN CORSO...
                </>
              ) : (
                "INVIA DATI"
              )}{" "}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardOrganizer;
