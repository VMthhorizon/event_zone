import "./EventCard.css";
import {
  Card,
  Badge,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Pagination,
} from "react-bootstrap";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../../LoadingCard/LoadingCard";
import { badgeColor } from "../../helpers/eventUtils";
import {
  fetchAllEvents,
  setPage,
  setSortDirection,
} from "../../Redux/Slices/eventSlice";
import { FcSearch } from "react-icons/fc";
import { LuCalendarArrowDown, LuCalendarArrowUp } from "react-icons/lu";

function EventCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.user);

  const userKey = profile?.id ? `favourites_${profile?.id}` : null;

  const [favourites, setFavourites] = useState([]);

  // Sincronizza i preferiti da localStorage quando il profilo utente è pronto
  useEffect(() => {
    if (userKey) {
      const saved = localStorage.getItem(userKey);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFavourites(JSON.parse(saved));
      }
    }
  }, [userKey]);

  // Lettura dello stato globale di Redux inclusi i filtri laterali
  const {
    eventsList,
    loading,
    error,
    searchTerm,
    selectedCategory,
    maxPrice,
    selectedDate,
    sortDirection,
    page,
    size,
    totalPages,
  } = useSelector((state) => state.events);

  // Scarica tutti gli eventi dal backend una sola volta all'avvio
  useEffect(() => {
    dispatch(
      fetchAllEvents({
        page: page,
        size: size,
        sortBy: "eventDate",
        sortDir: sortDirection.toUpperCase(),
      }),
    );
  }, [dispatch, sortDirection, page, size]);

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(favourites));
    }
  }, [favourites, userKey]);

  const toggleFavourites = (e, eventId) => {
    e.stopPropagation();
    setFavourites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

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

  // Funzione per il cambio della pagina con scroll per tornare all'inizio della pagina
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const eventsArray = Array.isArray(eventsList)
    ? eventsList
    : eventsList?.content;

  // Filtraggio dinamico lato client
  const filteredEvents = eventsArray.filter((singleEvent) => {
    // Controllo la ricerca
    const matchesSearch =
      !searchTerm ||
      singleEvent.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      singleEvent.place?.toLowerCase().includes(searchTerm.toLowerCase());

    //Controllo categoria
    const eventCategory = singleEvent.eventType || singleEvent.category || "";
    const matchesCategory =
      selectedCategory === "tutti" ||
      eventCategory.toLowerCase() === selectedCategory.toLowerCase();

    // Controllo budget massimo
    const matchesPrice =
      maxPrice === 300 || Number(singleEvent.price) <= Number(maxPrice);

    // Controllo data
    const matchesDate =
      !selectedDate ||
      (singleEvent.eventDate && singleEvent.eventDate.startsWith(selectedDate));

    return matchesSearch && matchesCategory && matchesPrice && matchesDate;
  });

  return (
    <Container className="px-0">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <div className="d-flex flex-column bg-transparent flex-xxl-row justify-content-between align-items-center gap-2 w-100 pt-3">
          <div className="gap-2 d-flex align-items-center justify-content-center mb-2 mb-xxl-0">
            <FcSearch className="fs-1" />
            <h3 className="text-center">I Risultati della tua ricerca</h3>
          </div>
          <div className=" d-flex flex-column flex-md-row align-items-center justify-content-center gap-2 ">
            <h5>Ordina per data: </h5>
            <div className="d-flex align-items-center justify-content-center gap-2 ">
              <Button
                onClick={() => dispatch(setSortDirection("asc"))}
                className="btn-gradient d-flex justify-content-between align-items-center"
              >
                <h6>Crescente</h6>
                <LuCalendarArrowUp />
              </Button>
              <Button
                onClick={() => dispatch(setSortDirection("desc"))}
                className="btn-gradient d-flex justify-content-between align-items-center"
              >
                <h6>Decrescente</h6>
                <LuCalendarArrowDown />
              </Button>
            </div>
          </div>
        </div>
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <Col xs={12} sm={6} lg={4} xxl={3} key={index} className="gx-3 ">
              <LoadingCard />
            </Col>
          ))}

        {!loading && filteredEvents.length === 0 && (
          <Col xs={12} className="text-center py-5">
            <h5>Nessun evento trovato per i filtri selezionati.</h5>
          </Col>
        )}

        {!loading &&
          filteredEvents.map((singleEvent) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              xxl={3}
              key={singleEvent.eventId}
              className="gx-3 gy-3"
            >
              {singleEvent.availableSeats <= 0 ? (
                <Card className="event-card-soldout">
                  <Card.Img
                    src={singleEvent.img}
                    alt={singleEvent.img}
                    className="event-card-wrapper-soldout"
                  />
                  <Card.ImgOverlay className="p-0 d-flex justify-content-center align-items-center">
                    <img
                      src="/soldout.png"
                      alt="soldout"
                      className="event-card-img-soldout"
                    />
                  </Card.ImgOverlay>
                </Card>
              ) : (
                <Card
                  onClick={() =>
                    navigate(`/eventDetails/${singleEvent.eventId}`)
                  }
                  className="event-card"
                >
                  <Card.Img
                    src={singleEvent.img}
                    alt={singleEvent.title}
                    className="event-card-img"
                  />
                  <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge
                        className={`badge-custom ${badgeColor(
                          singleEvent.eventType,
                        )}`}
                      >
                        {singleEvent.eventType}
                      </Badge>
                      <Button
                        variant="light"
                        className="preferiti-icon"
                        onClick={(e) =>
                          toggleFavourites(e, singleEvent.eventId)
                        }
                      >
                        {favourites.includes(singleEvent.eventId) ? (
                          <PiHeartFill className="favourites-heart-icons" />
                        ) : (
                          <PiHeartBold className="favourites-heart-icons" />
                        )}
                      </Button>
                    </div>

                    <div>
                      <small className="event-card-text">
                        {formatDate(singleEvent.eventDate)}
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
              )}
            </Col>
          ))}
      </Row>
      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center my-5">
          <Pagination className="mb-0">
            <Pagination.First
              disabled={page === 0}
              onClick={() => handlePageChange(0)}
            />

            <Pagination.Prev
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            />

            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
            />

            <Pagination.Last
              disabled={page === totalPages - 1}
              onClick={() => handlePageChange(totalPages - 1)}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
}

export default EventCard;
