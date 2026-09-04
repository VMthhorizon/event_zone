import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Wallet from "../Wallet/Wallet";
import EventCard from "../Homepage/EventCard/EventCard";
import DashboardPage from "../Dashboard/DashboardPage";

import { fetchWallet, fetchChargeWallet } from "../Redux/Slices/walletSlice";
import { fetchUserProfile } from "../Redux/Slices/userSlice";

import "./ProfiloUser.css";

function ProfiloUser() {
  const dispatch = useDispatch();

  // Redux States
  const { profile } = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet.data);
  const walletLoading = useSelector((state) => state.wallet.loading);

  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
    dispatch(fetchWallet());
  }, [dispatch, profile]);

  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!topUpAmount || Number(topUpAmount) <= 0) return;

    await dispatch(fetchChargeWallet(Number(topUpAmount)));
    setTopUpAmount("");
  };

  return (
    <Container fluid className="py-4 px-4">
      <h1>BENVENUTO {profile?.username}</h1>
      <h3 className="text-white-50 mb-4">{profile?.role}</h3>

      <Row className="justify-content-between mb-2 align-items-start">
        <Col lg={4} md={5} className="profile-card-gradient pt-2">
          <Wallet
            wallet={wallet}
            walletLoading={walletLoading}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            handleTopUp={handleTopUp}
          />
        </Col>

        <Col lg={8} md={7}>
          <Card className=" border-0 h-100 px-3 profile-card-gradient pt-2">
            <h5 className="fw-bold mb-3">Lista Preferiti</h5>
            <div className="flex-grow-1 " style={{ maxHeight: "550px" }}>
              <EventCard />
            </div>
          </Card>
        </Col>
      </Row>

      {/* <Row className="mb-4 profile-card-gradient py-2">
        <Col xs={12}>
          <OrdersList />
        </Col>
      </Row> */}

      <Row className="mb-4">
        <Col xs={12}>
          <DashboardPage />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfiloUser;
