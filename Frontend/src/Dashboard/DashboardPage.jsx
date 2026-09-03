import "./DashboardPage.css";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardAdmin from "./DashboardAdmin";
import DashboardOrganizer from "./DashboardOrganizer";
import DashboardCustomer from "./DashboardCustomer";
import { useEffect } from "react";
import { fetchUserProfile } from "../Redux/Slices/userSlice";

function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile, loading } = useSelector((state) => state.user); // Prendo le informazioni dallo slice dello user

  const handleDashboard = () => {
    if (loading) {
      return (
        <div className="text-center my-4">
          <Spinner animation="border" variant="light" />
          <span className="ms-2 text-white">Caricamento in corso...</span>
        </div>
      );
    }

    switch (profile?.role) {
      case "ADMIN":
        return <DashboardAdmin />;
      case "ORGANIZER":
        return <DashboardOrganizer />;
      case "CUSTOMER":
        return <DashboardCustomer />;
      default:
        return <h1>OPS.....Qualcosa è andato storto</h1>;
    }
  };

  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, profile]);

  return (
    <Container fluid>
      <Row>
        <h1>BENVENUTO {profile?.username}</h1>
        <h3 className="text-white-50">{profile?.role}</h3>
        {handleDashboard()}
      </Row>
      <Button
        className="btn-gradient mt-5"
        onClick={() => navigate("/homepage")}
      >
        HOME
      </Button>
    </Container>
  );
}

export default DashboardPage;
