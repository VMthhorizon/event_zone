import { Button, Container, Form, Row, Table } from "react-bootstrap";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/userService";
import { changeUserRole, getUsersList } from "../services/adminService";

// Array dei ruoli
const ALL_ROLES = ["ADMIN", "ORGANIZER", "CUSTOMER"];

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

  // Funzione per gestire il cambio del ruolo in maniera asincrona
  const handleChangeRole = async (userId, newRole) => {
    try {
      const updatedUser = await changeUserRole(userId, newRole);

      setListUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, role: updatedUser.role } : u,
        ),
      );
    } catch (error) {
      alert("Impossibile modificare il ruolo: " + error.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
    fetchListUsers();
  }, []);

  return (
    <Container fluid>
      <Row>
        <h1>BENVENUTO {user?.username}</h1>
        <h3 className="text-white-50">{user?.role}</h3>
        <h3 className="mb-3 text-center">LISTA UTENTI</h3>
        <Table
          striped
          bordered
          hover
          responsive
          variant="dark"
          className="align-middle"
        >
          <thead>
            <tr className="text-center">
              <th>NOME</th>
              <th>COGNOME</th>
              <th>EMAIL</th>
              <th>RUOLO ATTUALE</th>
              <th>CAMBIA RUOLO</th>
            </tr>
          </thead>
          <tbody>
            {listUsers?.map((singleUser) => (
              <tr key={singleUser.id} className="text-start">
                <td>{singleUser.nome || singleUser.name}</td>
                <td>{singleUser.cognome || singleUser.surname}</td>
                <td>{singleUser.email}</td>

                <td className="fw-bold">{singleUser.role}</td>

                <td>
                  <Form.Select
                    size="sm"
                    value={singleUser.role}
                    onChange={(e) =>
                      handleChangeRole(singleUser.id, e.target.value)
                    }
                    className="bg-dark text-white border-secondary"
                  >
                    <option value={singleUser.role} disabled>
                      Seleziona un nuovo ruolo
                    </option>

                    {ALL_ROLES.filter((r) => r !== singleUser.role).map(
                      (roleOption) => (
                        <option key={roleOption} value={roleOption}>
                          {roleOption}
                        </option>
                      ),
                    )}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
