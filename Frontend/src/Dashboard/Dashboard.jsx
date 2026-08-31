import { Button, Col, Container, Row } from "react-bootstrap";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";
import { getUsersList } from "../services/adminService";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(); // Salvo le informazioni del profilo loggato in uno stato
  const [listUsers, setListUsers] = useState(); // Stato per la lista degli utenti

  // Fetch per la lista degli utenti
  const fetchListUsers = async () => {
    try {
      const listResponse = await getUsersList();

      setListUsers(listResponse);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch per il profilo loggato
  const fetchProfile = async () => {
    try {
      const userProfile = await getUserProfile();

      setUser(userProfile);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchListUsers();
  }, []);

  return (
    <Container fluid>
      <h1>BENVENUTO {user?.username}</h1>
      <h3 className="text-white-50">{user?.role}</h3>
      <Row>
        <h3>LISTA UTENTI</h3>
        {listUsers?.map((singleUser) => (
          <Col
            xs={12}
            className="d-flex justify-content-between align-items-center"
            key={singleUser.id}
          >
            <h6>{singleUser.username}</h6>
            <h6>{singleUser.email}</h6>
            <h6>{singleUser.role}</h6>
          </Col>
        ))}
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

export default Dashboard;
