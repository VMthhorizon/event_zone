import "./OrdersList.css";
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Card, Collapse, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Redux/Slices/orderSlice";
import { fetchTickets } from "../services/ticketService";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";

function OrdersList() {
  const dispatch = useDispatch();
  const { ordersList, loading, error } = useSelector((state) => state.orders);

  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [ticketsByOrder, setTicketsByOrder] = useState({});
  const [loadingTicketsId, setLoadingTicketsId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const handleOrderClick = async (orderId) => {
    const isOpening = expandedOrderId !== orderId;
    setExpandedOrderId(isOpening ? orderId : null);

    if (isOpening && !ticketsByOrder[orderId] && loadingTicketsId !== orderId) {
      setLoadingTicketsId(orderId);
      try {
        const data = await fetchTickets(orderId);
        setTicketsByOrder((prev) => ({
          ...prev,
          [orderId]: data,
        }));
      } catch (err) {
        console.error(
          "Errore caricamento biglietti per ordine #" + orderId,
          err,
        );
      } finally {
        setLoadingTicketsId(null);
      }
    }
  };

  return (
    <Card className="border-0 bg-transparent">
      <h4 className="fw-bold mb-3 text-secondary">I Miei Ordini</h4>
      <h6 className="fw-bold mb-3 text-white-50 ">
        Clicca sull'ordine per visualizzare i biglietti acquistati
      </h6>

      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && (!ordersList || ordersList.length === 0) && (
        <p className="text-muted mb-0">Non hai ancora effettuato ordini.</p>
      )}

      {!loading && ordersList && ordersList.length > 0 && (
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0 border-secondary">
            <thead>
              <tr>
                <th className="text-secondary">ID Ordine</th>
                <th className="text-secondary">Data Acquisto</th>
                <th className="text-secondary">Totale</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => {
                const isOpen = expandedOrderId === order?.id;
                const tickets = ticketsByOrder[order?.id] || [];
                const isLoadingTickets = loadingTicketsId === order?.id;

                return (
                  <React.Fragment key={order?.id}>
                    <tr
                      onClick={() => handleOrderClick(order?.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="fw-bold text-white d-flex align-items-center">
                        <span className="me-2 text-white">
                          {isOpen ? (
                            <BiDownArrow className="text-secondary" />
                          ) : (
                            <BiRightArrow className="text-secondary" />
                          )}
                        </span>
                        #{order?.id}
                      </td>
                      <td className="fw-bold text-info">
                        {formatDate(order?.creationDate)}
                      </td>
                      <td className="fw-semibold text-info">
                        €{order?.totalPrice?.toFixed(2)}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="3" className="p-0 border-0">
                        <Collapse in={isOpen}>
                          <div className="p-3 bg-dark text-white border-bottom border-secondary">
                            <h6 className="text-secondary fw-bold mb-2 fs-7">
                              Biglietti acquistati:
                            </h6>

                            {isLoadingTickets && (
                              <div className="py-2 text-center">
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  variant="info"
                                />
                                <span className="ms-2 small text-muted">
                                  Caricamento biglietti...
                                </span>
                              </div>
                            )}

                            {!isLoadingTickets && tickets.length > 0 && (
                              <Table
                                size="sm"
                                variant="dark"
                                hover
                                responsive
                                className="mb-0 mt-2"
                              >
                                <thead>
                                  <tr className="text-muted small">
                                    <th>Titolo Evento</th>
                                    <th>Data Evento</th>
                                    <th>Luogo</th>
                                    <th>Coordinate (Lat, Long)</th>
                                    <th>Prezzo Biglietto</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tickets.map((ticket) => (
                                    <tr key={ticket?.id}>
                                      <td className="fw-bold text-info">
                                        {ticket?.event?.title || "N/A"}
                                      </td>
                                      <td className="text-light">
                                        {formatDate(ticket?.event?.eventDate)}
                                      </td>
                                      <td className="text-muted">
                                        {ticket?.event?.place || "N/A"}
                                      </td>
                                      <td className="text-muted small">
                                        {ticket?.event?.latitude &&
                                        ticket?.event?.longitude
                                          ? `${ticket.event.latitude}, ${ticket.event.longitude}`
                                          : "N/A"}
                                      </td>
                                      <td>
                                        <Badge bg="secondary">
                                          €
                                          {ticket?.eventPrice?.toFixed(2) ||
                                            "0.00"}
                                        </Badge>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            )}

                            {!isLoadingTickets && tickets.length === 0 && (
                              <p className="text-muted small mb-0">
                                Nessun biglietto trovato per questo ordine.
                              </p>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </Card>
  );
}

export default OrdersList;
