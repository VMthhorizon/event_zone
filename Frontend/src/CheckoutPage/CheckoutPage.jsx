import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, checkoutOrder } from "../Redux/Slices/cartSlice";
import { fetchWallet, fetchChargeWallet } from "../Redux/Slices/walletSlice";
import { useEffect, useState } from "react";
import Wallet from "../Wallet/Wallet";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estrazione stati da Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  const cartError = useSelector((state) => state.cart.error);

  const wallet = useSelector((state) => state.wallet.data);
  const walletLoading = useSelector((state) => state.wallet.loading);

  const [topUpAmount, setTopUpAmount] = useState("");
  const [localError, setLocalError] = useState("");

  // Carica i dati del wallet all'apertura del componente
  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  // Calcolo del totale derivato direttamente dai dati in cartItems
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.event.price * item.quantity;
  }, 0);

  // Gestione Ricarica Wallet Rapida
  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!topUpAmount || Number(topUpAmount) <= 0) return;

    await dispatch(fetchChargeWallet(Number(topUpAmount)));
    setTopUpAmount("");
  };

  // Gestione Invio Ordine
  const handleCheckout = async () => {
    setLocalError("");

    if (!wallet || wallet.balance < totalPrice) {
      setLocalError(
        "Saldo insufficiente! Ricarica il tuo wallet per completare l'acquisto.",
      );
      return;
    }

    const result = await dispatch(checkoutOrder());

    if (checkoutOrder.fulfilled.match(result)) {
      alert("Ordine effettuato con successo"); // Reindirizza allo storico ordini a buon fine
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h4>Il tuo carrello è vuoto</h4>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate("/homepage")}
        >
          Torna agli Eventi
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="my-4">
      <h2 className="mb-4">RIEPILOGO</h2>

      {(cartError || localError) && (
        <Alert variant="danger">{cartError || localError}</Alert>
      )}

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm border-0 p-3">
            <h5 className="mb-3">Eventi nel Carrello ({cartItems.length})</h5>
            <Container fluid className="px-0">
              {cartItems.map(({ event, quantity }) => (
                <Row
                  key={event.eventId || event.id}
                  className="d-flex align-items-center justify-content-between py-3 border-bottom g-3"
                >
                  <Col xs={3} sm={2}>
                    <Image
                      src={event.img}
                      alt={event.title}
                      rounded
                      style={{
                        width: "100%",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>

                  <Col xs={6} sm={7}>
                    <div className="fw-bold fs-5 text-truncate">
                      {event.title}
                    </div>
                    <div className="text-muted">
                      Quantità: <strong>{quantity}</strong> &times; €
                      {event.price.toFixed(2)}
                    </div>
                    <div className="fw-semibold text-primary mt-1">
                      Subtotale: €{(event.price * quantity).toFixed(2)}
                    </div>
                  </Col>

                  <Col xs={3} sm={3} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        dispatch(removeFromCart(event.eventId || event.id))
                      }
                    >
                      <FaTrash size={14} className="me-1" /> Rimuovi
                    </Button>
                  </Col>
                </Row>
              ))}
            </Container>
          </Card>
        </Col>

        <Col lg={4}>
          <Wallet
            wallet={wallet}
            walletLoading={walletLoading}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            handleTopUp={handleTopUp}
          />

          <Card className="shadow-sm border-0 p-3">
            <h5>Riepilogo Ordine</h5>
            <div className="d-flex justify-content-between my-2">
              <span>Totale Biglietti:</span>
              <strong>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-4 fw-bold mb-3">
              <span>Totale da Pagare:</span>
              <span className="text-primary">€{totalPrice.toFixed(2)}</span>
            </div>

            <Button
              size="lg"
              className="w-100 btn-gradient"
              disabled={cartLoading}
              onClick={handleCheckout}
            >
              {cartLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                `Checkout €${totalPrice.toFixed(2)}`
              )}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
