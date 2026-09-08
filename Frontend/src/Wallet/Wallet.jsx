import "./Wallet.css";

import { Button, Form, Spinner } from "react-bootstrap";
import { FaWifi } from "react-icons/fa6";
import "./Wallet.css";
import { TbMoneybagPlus } from "react-icons/tb";

function Wallet({
  wallet,
  walletLoading,
  topUpAmount,
  setTopUpAmount,
  handleTopUp,
}) {
  return (
    <div className="wallet-container mb-4 ">
      <h5 className="fw-bold mb-3 text-secondary">My Wallet</h5>
      <div className="ez-card shadow-lg mb-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="ez-card-brand">MASTERCARD</span>
          <div className="border border-white border-2 rounded-circle p-1 d-flex align-items-center justify-content-center">
            <FaWifi
              style={{ transform: "rotate(90deg)", fontSize: "0.8rem" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="ez-card-label">SALDO</div>
          {walletLoading ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            <div className="ez-card-balance">
              €{wallet?.balance?.toFixed(2) || "0.00"}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-end">
          <div className="ez-card-number">•••• 4421</div>
          <div className="mastercard-logo">
            <span className="mc-circle mc-circle-red"></span>
            <span className="mc-circle mc-circle-yellow"></span>
          </div>
        </div>
      </div>

      <Form onSubmit={handleTopUp} className=" p-3 shadow-sm ez-card">
        <Form.Label>
          <h6 className="text-secondary">Ricarica Rapida</h6>
        </Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type="number"
            placeholder="Importo (€)"
            value={topUpAmount}
            min="1"
            onChange={(e) => setTopUpAmount(e.target.value)}
            className="bg-transparent border-1 border-info"
          />
          <Button
            type="submit"
            className="btn-gradient d-flex align-items-center"
          >
            <h6 className="btn-headers">Ricarica</h6> <TbMoneybagPlus />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Wallet;
