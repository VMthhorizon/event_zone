import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import { Container, Spinner, Alert, Card, Button } from "react-bootstrap";
import { getDistanceInKm } from "../../helpers/eventDistanceUtils";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function EventMap() {
  const navigate = useNavigate();
  const { eventsList } = useSelector((state) => state.events);

  const [userLocation, setUserLocation] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const RADIUS_KM = 10;

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGeoError("La geolocalizzazione non è supportata dal tuo browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (error) => {
        setLoadingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Hai negato l'accesso alla posizione.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Informazioni sulla posizione non disponibili.");
            break;
          case error.TIMEOUT:
            setGeoError("Richiesta di geolocalizzazione scaduta.");
            break;
          default:
            setGeoError(`Errore: ${error.message}`);
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const eventsArray = Array.isArray(eventsList)
    ? eventsList
    : eventsList?.content || [];

  const nearbyEvents = userLocation
    ? eventsArray.filter((event) => {
        const distance = getDistanceInKm(
          userLocation.lat,
          userLocation.lng,
          Number(event.latitude),
          Number(event.longitude),
        );
        return distance <= RADIUS_KM;
      })
    : [];

  if (loadingLocation) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Rilevamento della tua posizione in corso...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h3 className="mb-3">
        Eventi vicini a te (nel raggio di {RADIUS_KM} km)
      </h3>

      {geoError && <Alert variant="warning">{geoError}</Alert>}

      {userLocation && (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <div
            style={{
              height: "500px",
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <Map
              defaultCenter={{ lat: userLocation.lat, lng: userLocation.lng }}
              defaultZoom={11}
              mapId="DEMO_MAP_ID"
              gestureHandling={"greedy"}
              style={{ width: "100%", height: "100%" }}
            >
              {/* Segnalino Posizione Utente in rosso */}
              <AdvancedMarker
                position={{ lat: userLocation.lat, lng: userLocation.lng }}
              >
                <Pin
                  background={"#dc3545"}
                  glyphColor={"#fff"}
                  borderColor={"#800000"}
                />
              </AdvancedMarker>

              {/* Segnalino Posizione Eventi in blu */}
              {nearbyEvents.map((event) => (
                <AdvancedMarker
                  key={event.eventId}
                  position={{
                    lat: Number(event.latitude),
                    lng: Number(event.longitude),
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <Pin
                    background={"#0d6efd"}
                    glyphColor={"#fff"}
                    borderColor={"#004085"}
                  />
                </AdvancedMarker>
              ))}

              {/* Card Dettagli al click del segnalino */}
              {selectedEvent && (
                <InfoWindow
                  position={{
                    lat: Number(selectedEvent.latitude),
                    lng: Number(selectedEvent.longitude),
                  }}
                  onCloseClick={() => setSelectedEvent(null)}
                >
                  <Card style={{ width: "12rem", border: "none" }}>
                    <Card.Img
                      variant="top"
                      src={selectedEvent.img}
                      style={{ height: "80px", objectFit: "cover" }}
                    />
                    <Card.Body className="p-2 text-center">
                      <Card.Title className="fs-6 mb-1">
                        {selectedEvent.title}
                      </Card.Title>
                      <Card.Text className="mb-2 text-muted small">
                        {selectedEvent.place}
                      </Card.Text>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate(`/eventDetails/${selectedEvent.eventId}`)
                        }
                      >
                        Vedi Dettagli
                      </Button>
                    </Card.Body>
                  </Card>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      )}

      <div className="mt-3 text-center">
        <h5 className="text-secondary">
          Trovati <strong>{nearbyEvents.length}</strong> eventi entro{" "}
          {RADIUS_KM} km da te.
        </h5>
      </div>
    </Container>
  );
}

export default EventMap;
