import "./OrdersList.css";
import { useEffect } from "react";
import { Table, Spinner, Alert, Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Redux/Slices/orderSlice";

function OrdersList() {
  const dispatch = useDispatch();
  const { ordersList, loading, error } = useSelector((state) => state.orders);

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

  return (
    <Card className=" border-0 ">
      <h5 className="fw-bold mb-3">I Miei Ordini</h5>

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
          {console.log(ordersList)}
          <Table hover align="middle" className="mb-0 ">
            <thead>
              <tr>
                <th className="text-white">ID Ordine</th>
                <th className="text-white">Data</th>
                <th className="text-white">Totale</th>
                <th className="text-white">Stato</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order, index) => (
                <tr key={order?.id || index}>
                  <td className="fw-bold text-white">
                    #{order?.id || index + 1}
                  </td>
                  <td className="fw-bold text-white">
                    {formatDate(order?.creationDate)}
                  </td>
                  <td className="fw-semibold text-white">
                    €
                    {order?.totalAmount?.toFixed(2) ||
                      order?.price?.toFixed(2) ||
                      "0.00"}
                  </td>
                  <td>
                    <Badge
                      bg={
                        order?.status === "COMPLETED" ? "success" : "secondary"
                      }
                    >
                      {order?.status || "CONFERMATO"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Card>
  );
}

export default OrdersList;
