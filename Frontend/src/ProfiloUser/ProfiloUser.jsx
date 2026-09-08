import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Wallet from "../Wallet/Wallet";
import DashboardPage from "../Dashboard/DashboardPage";

import { fetchWallet, fetchChargeWallet } from "../Redux/Slices/walletSlice";
import { fetchUserProfile } from "../Redux/Slices/userSlice";

import "./ProfiloUser.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa";
import { fetchAllEvents } from "../Redux/Slices/eventSlice";
import { addToCart } from "../Redux/Slices/cartSlice";
import OrdersList from "../OrdersList/OrdersList";

function ProfiloUser() {
  const dispatch = useDispatch();

  // Redux States
  const { profile } = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet.data);
  const walletLoading = useSelector((state) => state.wallet.loading);

  const { eventsList } = useSelector((state) => state.events);
  const [favouritesId, setFavouritesId] = useState(() => {
    const saved = localStorage.getItem("user_favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const handleRemoveFavourites = (eventdId) => {
    const favouritesUpdated = favouritesId.filter((id) => id !== eventdId);
    setFavouritesId(favouritesUpdated);
    localStorage.setItem("user_favourites", JSON.stringify(favouritesUpdated));
  };

  const favouritesList = eventsList.filter((event) =>
    favouritesId.includes(event.eventId),
  );

  const [topUpAmount, setTopUpAmount] = useState("");

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
    if (!eventsList || eventsList.length === 0) {
      dispatch(fetchAllEvents());
    }
    dispatch(fetchWallet());
  }, [dispatch, profile, eventsList]);

  const handleTopUp = async (e) => {
    e.preventDefault();
    if (!topUpAmount || Number(topUpAmount) <= 0) return;

    await dispatch(fetchChargeWallet(Number(topUpAmount)));
    setTopUpAmount("");
  };

  return (
    <Container fluid className="py-2 px-4">
      <h1>FELICE di RIVEDERTI, {profile?.username}</h1>
      <h3 className="text-white-50 mb-4">{profile?.role}</h3>

      <Row className="justify-content-between mb-2 align-items-start gap-3">
        <Col md={5} lg={4} className="profile-card-gradient pt-2">
          <Wallet
            wallet={wallet}
            walletLoading={walletLoading}
            topUpAmount={topUpAmount}
            setTopUpAmount={setTopUpAmount}
            handleTopUp={handleTopUp}
          />
        </Col>

        <Col md={6} lg={7} className="px-0">
          <Card className="border-0 h-100 px-3 profile-card-gradient pt-2 pb-0">
            <h5 className="fw-bold mb-3 text-secondary">Lista Preferiti</h5>
            {favouritesList?.length === 0 ? (
              <h3>Non ci sono eventi nella tua lista preferiti.....</h3>
            ) : (
              favouritesList?.map((singleFavourite) => {
                return (
                  <div
                    key={singleFavourite.eventId}
                    className="d-flex flex-column w-100 align-items-center justify-content-between mb-3 border-bottom gap-2"
                  >
                    <div className="favourites-wrapper">
                      <img
                        src={singleFavourite.img}
                        alt={singleFavourite.title}
                        className="favourites-img"
                      />
                      <h6>{singleFavourite.title}</h6>
                      <h6 className="text-secondary">
                        {singleFavourite.price + " €"}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2 gap-2 w-100">
                      <Button
                        onClick={() => dispatch(addToCart(singleFavourite))}
                        variant="outline-success"
                        className="w-100"
                      >
                        <FaCartPlus className="fs-5" />
                      </Button>
                      <Button
                        className="w-100"
                        variant="outline-danger"
                        onClick={() =>
                          handleRemoveFavourites(singleFavourite.eventId)
                        }
                      >
                        <RiDeleteBin6Line className="fs-5" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </Card>
        </Col>
      </Row>

      <Row className="profile-card-gradient py-2">
        <Col xs={12}>
          <OrdersList />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <DashboardPage />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfiloUser;
